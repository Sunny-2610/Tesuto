import * as vscode from 'vscode';

const TOKENS_KEY = 'tesuto-tokens';
let activeTokenId: string | null = null;

export class TokenStorage {
  private static getContext(): vscode.ExtensionContext {
    return (global as any).extensionContext;
  }

  static getTokens(): any[] {
    return this.getContext().globalState.get(TOKENS_KEY, []);
  }

  static saveToken(token: any): void {
    const tokens = this.getTokens();
    const existing = tokens.find(t => t.id === token.id);
    if (existing) Object.assign(existing, token);
    else tokens.push(token);
    this.getContext().globalState.update(TOKENS_KEY, tokens);
  }

  static deleteToken(id: string): void {
    const tokens = this.getTokens().filter(t => t.id !== id);
    this.getContext().globalState.update(TOKENS_KEY, tokens);
    if (activeTokenId === id) activeTokenId = null;
  }

  static getActiveToken(): string | null {
    if (!activeTokenId) return null;
    const token = this.getTokens().find(t => t.id === activeTokenId);
    return token ? token.value : null;
  }

  static setActiveToken(id: string | null): void {
    activeTokenId = id;
  }
}