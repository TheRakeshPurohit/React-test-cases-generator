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
        let a = await vscode.workspace.findFiles(
          "**/src/**/*.js",
          "/node_modules/",
          50
        );
        console.log(a);
        vscode.window.showInformationMessage("Generating Tests for you !");

        let reactTestCases = vscode.window.createOutputChannel(
          "ReactTestCases"
        );

        if (a.length > 0 && vscode.workspace.workspaceFolders) {
          const testDirPath = vscode.Uri.parse(
            vscode.workspace.workspaceFolders[0].uri.path.toString() +
              "/__tests__"
          );

          vscode.workspace.fs.createDirectory(testDirPath);
          // vscode.workspace.updateWorkspaceFolders(0, undefined, {
          //   uri: ll,
          //   name: "__tests__",
          // });
          a.forEach((a) => {
            let home = last(split(a.path, "/"));
            console.log(home);
            if (a.path.includes("index")) {
              vscode.window.showInformationMessage("Got an Index file !");
            } else {
              const wsedit = new vscode.WorkspaceEdit();
              const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
              const filePath = vscode.Uri.file(wsPath + "/hello/world.md");
              vscode.window.showInformationMessage(filePath.toString());
              wsedit.createFile(filePath, { ignoreIfExists: true });
              vscode.workspace.applyEdit(wsedit);
              vscode.window.showInformationMessage(
                "Created a new file: hello/world.md"
              );
              reactTestCases.append("\n" + last(split(a.path, "/")));
            }
          });
          vscode.window.showInformationMessage("Ready to Test !");
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
