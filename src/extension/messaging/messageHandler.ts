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
      // API requests
      case MessageType.SEND_REQUEST:
        return this.handleSendRequest(message.payload);

      // Collections
      case MessageType.SAVE_COLLECTION:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.saveCollection(message.payload) };
      case MessageType.GET_COLLECTIONS:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.getCollections() };
      case MessageType.DELETE_COLLECTION:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.deleteCollection(message.payload.id) };
      case MessageType.ADD_REQUEST_TO_COLLECTION:
        return this.handleAddRequestToCollection(message.payload);

      // History
      case MessageType.GET_HISTORY:
        return { type: MessageType.HISTORY_LIST, payload: HistoryStorage.getHistory() };
      case MessageType.CLEAR_HISTORY:
        HistoryStorage.clearHistory();
        return { type: MessageType.HISTORY_LIST, payload: [] };

      // Tokens
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