// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('VSCode-TRP-RTCG.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from React Test Case Generator!');
	});

	context.subscriptions.push(disposable);

	let generateTests = vscode.commands.registerCommand('VSCode-TRP-RTCG.generateTests', () => {
		// The code you place here will be executed every time your command is executed

		if (vscode.workspace.name) {
			// Display a message box to the user
			vscode.window.showInformationMessage('Scanning src/components');
			let a = vscode.workspace.findFiles("/src/components/*.js");
			vscode.window.showInformationMessage(a.toString());
			vscode.window.showInformationMessage('Generating Tests for you !');
		} else {
			vscode.window.showInformationMessage("No Workspace Found !");
		}
	});

	context.subscriptions.push(generateTests);
}

// this method is called when your extension is deactivated
export function deactivate() {}
