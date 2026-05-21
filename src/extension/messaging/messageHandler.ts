import * as vscode from 'vscode';
import { ApiService } from '../services/ApiService';
import { MessageType } from '../../shared/constants/messageTypes';
export class MessageHandler {
  private apiService: ApiService;
  constructor(private context: vscode.ExtensionContext) {
    this.apiService = new ApiService();
  }
  async handleMessage(message: any): Promise<any> {
    if (message.type === MessageType.SEND_REQUEST) {
      const response = await this.apiService.sendRequest(message.payload);
      return { type: MessageType.API_RESPONSE, payload: response };
    }
    return null;
  }
}