import * as vscode from 'vscode';
import { ApiService } from '../services/ApiService';
import { CollectionStorage } from '../storage/collectionStorage';
import { HistoryStorage } from '../storage/historyStorage';
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
      case MessageType.SAVE_COLLECTION:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.saveCollection(message.payload) };
      case MessageType.GET_COLLECTIONS:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.getCollections() };
      case MessageType.DELETE_COLLECTION:
        return { type: MessageType.COLLECTIONS_LIST, payload: CollectionStorage.deleteCollection(message.payload.id) };
      case MessageType.GET_HISTORY:
        return { type: MessageType.HISTORY_LIST, payload: HistoryStorage.getHistory() };
      case MessageType.CLEAR_HISTORY:
        HistoryStorage.clearHistory();
        return { type: MessageType.HISTORY_LIST, payload: [] };
      default:
        return null;
    }
  }

  private async handleSendRequest(request: any) {
    const response = await this.apiService.sendRequest(request);
    // Save to history
    HistoryStorage.addHistoryItem({ request, response, timestamp: Date.now() });
    return { type: MessageType.API_RESPONSE, payload: response };
  }
}