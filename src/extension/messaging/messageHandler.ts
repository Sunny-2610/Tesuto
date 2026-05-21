import * as vscode from 'vscode';

export class MessageHandler {
  constructor(private context: vscode.ExtensionContext) {}
  async handleMessage(message: any): Promise<any> {
    return null;
  }
}