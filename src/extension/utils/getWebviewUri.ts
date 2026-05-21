import * as vscode from 'vscode';
import * as path from 'path';

export function getWebviewUri(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  pathSegments: string[]
): vscode.Uri {
  const fileUri = vscode.Uri.file(path.join(extensionUri.fsPath, ...pathSegments));
  return webview.asWebviewUri(fileUri);
}