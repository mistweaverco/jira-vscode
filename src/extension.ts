import {
	window,
	commands,
	ExtensionContext,
	workspace,
	QuickPickItem
} from "vscode";
import * as open from "open";
import * as fs from "fs";

const getConfig = () => {
	const filepath = workspace.rootPath + "/.jira.json";
	if (fs.existsSync(filepath)) {
		return JSON.parse(fs.readFileSync(filepath, "utf-8"));
	} else {
		window.showErrorMessage("Jira configuration file not found!");
		return undefined;
	}
};

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand("jira.new", async () => {
			const config = getConfig();
			if (config === undefined) return;

			open(
				config.baseurl +
					"secure/CreateIssue!default.jspa"
			);
		})
	);

	context.subscriptions.push(
		commands.registerCommand("jira.link", async () => {
			const config = getConfig();
			if (config === undefined) return;

			const quickPick = window.createQuickPick();
			const items: QuickPickItem[] | { label: string }[] = [];

			for (const label in config.links) {
				items.push({
					label: label
				});
			}

			quickPick.items = items;

			quickPick.onDidChangeSelection(selection => {
				if (selection[0]) {
					open(
						config.baseurl +
							config.links[
								selection[0]
									.label
							]
					);
				}
			});

			quickPick.onDidHide(() => quickPick.dispose());
			quickPick.show();
		})
	);

	context.subscriptions.push(
		commands.registerCommand("jira.browse", async () => {
			const config = getConfig();
			if (config === undefined) return;

			const quickPick = window.createQuickPick();
			const items: QuickPickItem[] | { label: string }[] = [];

			config.projects.forEach((project: string) => {
				items.push({
					label: project
				});
			});

			quickPick.items = items;

			let project = "";
			let projectNumber: string | undefined = "0";

			quickPick.onDidChangeSelection(selection => {
				if (selection[0]) {
					project = selection[0].label;
					window.showInputBox({
						value: "",
						placeHolder: "Jira number",
						validateInput: number => {
							return isNaN(
								parseInt(
									number,
									10
								)
							)
								? "Is not a valid number!"
								: null;
						}
					}).then(number => {
						projectNumber = number;
						if (
							projectNumber !==
							undefined
						) {
							open(
								config.baseurl +
									"browse/" +
									project +
									"-" +
									projectNumber
							);
						}
					});
				}
			});

			quickPick.onDidHide(() => quickPick.dispose());
			quickPick.show();
		})
	);
}
