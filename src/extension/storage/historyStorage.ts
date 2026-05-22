import * as vscode from 'vscode';

const HISTORY_KEY = 'tesuto-history';
const MAX_HISTORY = 50;

export class HistoryStorage {
  private static getContext(): vscode.ExtensionContext {
    return (global as any).extensionContext;
  }

  static getHistory(): any[] {
    return this.getContext().globalState.get(HISTORY_KEY, []);
  }

  static addHistoryItem(item: any): void {
    let history = this.getHistory();
    history.unshift(item);
    if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
    this.getContext().globalState.update(HISTORY_KEY, history);
  }

  static clearHistory(): void {
    this.getContext().globalState.update(HISTORY_KEY, []);
  }
}