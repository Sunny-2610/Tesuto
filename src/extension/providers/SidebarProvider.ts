import * as vscode from 'vscode';

export class SidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true, // will be needed later for React
    };
    webviewView.webview.html = this._getHtml();
  }

  private _getHtml(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tesuto</title>
      <style>
        body {
          font-family: var(--vscode-font-family);
          color: var(--vscode-foreground);
          background-color: var(--vscode-editor-background);
          padding: 1rem;
        }
        .welcome {
          text-align: center;
          margin-top: 2rem;
        }
        h1 { font-size: 1.2rem; }
        p { color: var(--vscode-descriptionForeground); }
      </style>
    </head>
    <body>
      <div class="welcome">
        <h1>Tesuto API Tester</h1>
        <p>🚀 Coming soon – send REST requests directly from VS Code.</p>
        <p><small>Stay tuned for updates!</small></p>
      </div>
    </body>
    </html>`;
  }
}