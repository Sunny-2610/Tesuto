import * as vscode from 'vscode';
import { ApiService } from '../services/ApiService';
import { CollectionStorage } from '../storage/collectionStorage';
import { HistoryStorage } from '../storage/historyStorage';
import { TokenStorage } from '../storage/tokenStorage';
import { MessageType } from '@shared/constants/messageTypes';

export class MessageHandler {
  private apiService: ApiService;
  constructor(private context: vscode.ExtensionContext) {
    this.apiService = new ApiService();
  }

  async handleMessage(message: any): Promise<any> {
    switch (message.type) {
      case MessageType.SEND_REQUEST:
        return this.handleSendRequest(message.payload);
      case MessageType.PROMPT_COLLECTION_NAME:
        return this.handlePromptCollectionName();
      case MessageType.PROMPT_TOKEN:
        return this.handlePromptToken();
      case MessageType.SAVE_COLLECTION:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.saveCollection(message.payload) };
      case MessageType.GET_COLLECTIONS:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.getCollections() };
      case MessageType.DELETE_COLLECTION:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.deleteCollection(message.payload.id) };
      case MessageType.ADD_REQUEST_TO_COLLECTION:
        return this.handleAddRequestToCollection(message.payload);
      case MessageType.GET_HISTORY:
        return { type: MessageType.HISTORY_LIST, payload: HistoryStorage.getHistory() };
      case MessageType.CLEAR_HISTORY:
        HistoryStorage.clearHistory();
        return { type: MessageType.HISTORY_LIST, payload: [] };
      case MessageType.SAVE_TOKEN:
        TokenStorage.saveToken(message.payload);
        return { type: MessageType.TOKENS_LIST, payload: TokenStorage.getTokens() };
      case MessageType.GET_TOKENS:
        return { type: MessageType.TOKENS_LIST, payload: TokenStorage.getTokens() };
      case MessageType.DELETE_TOKEN:
        TokenStorage.deleteToken(message.payload.id);
        return { type: MessageType.TOKENS_LIST, payload: TokenStorage.getTokens() };
      case MessageType.SET_ACTIVE_TOKEN:
        TokenStorage.setActiveToken(message.payload.id);
        return { type: MessageType.TOKENS_LIST, payload: TokenStorage.getTokens() };
      default:
        return null;
    }
  }

  private async handleSendRequest(request: any) {
    const response = await this.apiService.sendRequest(request);
    HistoryStorage.addHistoryItem({ request, response, timestamp: Date.now() });
    return { type: MessageType.API_RESPONSE, payload: response };
  }

  private async handlePromptCollectionName() {
    const name = await vscode.window.showInputBox({
      prompt: 'Enter collection name',
      placeHolder: 'e.g. User APIs',
      validateInput: (value) => {
        if (!value?.trim()) return 'Collection name is required';
        return null;
      }
    });
    if (name?.trim()) {
      const newCollection = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
        name: name.trim(),
        requests: []
      };
      const collections = CollectionStorage.saveCollection(newCollection);
      return { type: MessageType.COLLECTIONS_LIST, payload: collections };
    }
    return null;
  }

  private async handlePromptToken() {
    const name = await vscode.window.showInputBox({
      prompt: 'Enter token name',
      placeHolder: 'e.g. Production API Key',
      validateInput: (value) => {
        if (!value?.trim()) return 'Token name is required';
        return null;
      }
    });
    if (!name?.trim()) return null;

    const value = await vscode.window.showInputBox({
      prompt: `Enter value for "${name.trim()}"`,
      placeHolder: 'eyJhbGciOiJIUzI1NiIs...',
      password: true,
      validateInput: (value) => {
        if (!value?.trim()) return 'Token value is required';
        return null;
      }
    });
    if (!value?.trim()) return null;

    const newToken = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
      name: name.trim(),
      value: value.trim(),
      masked: true
    };
    TokenStorage.saveToken(newToken);
    return { type: MessageType.TOKENS_LIST, payload: TokenStorage.getTokens() };
  }

  private async handleAddRequestToCollection(payload: { collectionId: string; request: any }) {
    const collections = CollectionStorage.getCollections();
    const collection = collections.find(c => c.id === payload.collectionId);
    if (collection) {
      const newRequest = {
        id: Date.now().toString(),
        ...payload.request,
        createdAt: Date.now()
      };
      collection.requests.push(newRequest);
      CollectionStorage.saveCollection(collection);
      return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.getCollections() };
    }
    return null;
  }
}