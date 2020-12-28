// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { last, split } from "lodash";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "VSCode-TRP-RTCG.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from React Test Case Generator!"
      );
    }
  );

  context.subscriptions.push(disposable);

  let generateTests = vscode.commands.registerCommand(
    "VSCode-TRP-RTCG.generateTests",
    async () => {
      // The code you place here will be executed every time your command is executed

      if (vscode.workspace.name) {
        // Display a message box to the user
        vscode.window.showInformationMessage("Scanning src/components");
        let a = await vscode.workspace.findFiles("**/src/**/*.js");
        console.log(a);
        vscode.window.showInformationMessage("Generating Tests for you !");

        let reactTestCases = vscode.window.createOutputChannel(
          "ReactTestCases"
        );

        if (a.length > 0 && vscode.workspace.workspaceFolders) {
          vscode.workspace.updateWorkspaceFolders(0, undefined, {
            uri: vscode.Uri.parse(
              "file:///" +
                vscode.workspace.workspaceFolders[0].uri.authority +
                "/" +
                vscode.workspace.workspaceFolders[0].uri.path
            ),
            name: "__tests__",
          });
          a.forEach((a) => {
            reactTestCases.append("\n" + last(split(a.path, "/")));
          });
        } else {
          vscode.window.showInformationMessage(
            "Be Sure of having src folder in your project"
          );
        }
      } else {
        vscode.window.showInformationMessage("No Workspace Found !");
      }
    }
  );

  context.subscriptions.push(generateTests);
}

// this method is called when your extension is deactivated
export function deactivate() {}
