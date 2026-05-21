import * as vscode from 'vscode';
import { getWebviewUri } from '../utils/getWebviewUri';
import { generateNonce } from '../utils/generateNonce';
import { MessageHandler } from '../messaging/messageHandler';

export class SidebarProvider implements vscode.WebviewViewProvider {

  private _view?: vscode.WebviewView;

  constructor(
    private readonly _context: vscode.ExtensionContext
  ) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView
  ) {

    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._context.extensionUri
      ]
    };

    try {

      webviewView.webview.html =
        this._getHtmlForWebview(
          webviewView.webview
        );

    } catch (error) {

      console.error(
        'Failed to load webview:',
        error
      );
    }

    const messageHandler =
      new MessageHandler(this._context);

    webviewView.webview.onDidReceiveMessage(
      async (message) => {

        const response =
          await messageHandler.handleMessage(message);

        if (response) {

          webviewView.webview.postMessage(response);
        }
      }
    );
  }

  private _getHtmlForWebview(
    webview: vscode.Webview
  ): string {

    const scriptUri = getWebviewUri(
      webview,
      this._context.extensionUri,
      ['dist', 'webview', 'assets', 'index.js']
    );

    const styleUri = getWebviewUri(
      webview,
      this._context.extensionUri,
      ['dist', 'webview', 'assets', 'index.css']
    );

    const nonce = generateNonce();

    return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">

  <meta
    http-equiv="Content-Security-Policy"
    content="
      default-src 'none';
      style-src ${webview.cspSource} 'unsafe-inline';
      script-src 'nonce-${nonce}';
    "
  >

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <link
    href="${styleUri}"
    rel="stylesheet"
  >

  <title>Tesuto - API Tester</title>
</head>

<body>

  <div id="root"></div>

  <script
    nonce="${nonce}"
    src="${scriptUri}"
  ></script>

</body>

</html>`;
  }
}