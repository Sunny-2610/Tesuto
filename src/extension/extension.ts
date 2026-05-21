import * as vscode from 'vscode';
import { SidebarProvider } from './providers/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {

  // Create sidebar provider instance
  const provider = new SidebarProvider(context);

  // Register sidebar webview
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'tesuto-sidebar-view',
      provider
    )
  );

  // Optional command to open sidebar
  const openCommand = vscode.commands.registerCommand(
    'tesuto.open',
    () => {
      vscode.commands.executeCommand(
        'workbench.view.extension.tesuto-sidebar'
      );
    }
  );

  context.subscriptions.push(openCommand);
}

export function deactivate() {}