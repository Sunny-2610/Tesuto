declare const acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();

export const vscodeService = {
  postMessage(type: string, payload: any) {
    vscode.postMessage({ type, payload });
  },
  onMessage(callback: (message: any) => void) {
    const handler = (event: MessageEvent) => callback(event.data);
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }
};