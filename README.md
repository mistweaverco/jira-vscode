jira-vscode
===========

A vscode plugin to make browsing Jira more pleasant,
based on [this Neovim plugin](https://github.com/walialu/jira.nvim).

## Installation

Via [vscode marketplace](https://marketplace.visualstudio.com/items?itemName=superevilmegaco.jira-vscode)

## Usage

 - `:JiraBrowse OE-1337` to open up a browser with the issue.
 - `:JiraLink OE-Backlog` to open up a browser with a Jira link.
 - `:JiraNew` to open up a browser with a new Jira issue.

`JiraBrowse` and `JiraLink` can be auto-completed via `<tab>`-presses.

## Configuration file

Put a `.jira.json` in the root of your project.

```json
{
	"baseurl": "https://jira.hadcs.de/",
	"projects": [
		"OE",
		"ADM",
		"SDPSD"
	],
	"links": {
		"OE-Kanban-Board": "secure/RapidBoard.jspa?projectKey=OE&rapidView=1912",
		"OE-Backlog": "secure/RapidBoard.jspa?rapidView=1912&projectKey=OE&view=planning.nodetail&issueLimit=100"
	}
}
```

