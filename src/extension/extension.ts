import * as vscode from 'vscode';
import { SidebarProvider } from './providers/SidebarProvider';

export function activate(
  context: vscode.ExtensionContext
) {

  console.log(
    'Tesuto Extension Activated'
  );

  // IMPORTANT FIX
  (global as any).extensionContext =
    context;

  const provider =
    new SidebarProvider(context);

  context.subscriptions.push(

    vscode.window.registerWebviewViewProvider(
      'tesuto-sidebar-view',
      provider
    )
  );

  const openCommand =
    vscode.commands.registerCommand(
      'tesuto.open',
      async () => {

        await vscode.commands.executeCommand(
          'workbench.view.extension.tesuto-sidebar'
        );
      }
    );

  context.subscriptions.push(
    openCommand
  );
}

export function deactivate() {}