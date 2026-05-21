import { create } from 'zustand';
import { vscodeService } from '../services/vscodeService';
import { MessageType } from '@shared/constants/messageTypes';

interface ResponseState {
  loading: boolean;
  success: boolean;
  status: number;
  duration: number;
  size: number;
  data: any;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setResponse: (response: any) => void;
}

export const useResponseStore = create<ResponseState>((set) => {
  vscodeService.onMessage(msg => {
    if (msg.type === MessageType.API_RESPONSE) {
      set({
        loading: false,
        success: msg.payload.success,
        status: msg.payload.status,
        duration: msg.payload.duration,
        size: msg.payload.size,
        data: msg.payload.data,
        error: msg.payload.error || null
      });
    }
  });
  return {
    loading: false,
    success: false,
    status: 0,
    duration: 0,
    size: 0,
    data: null,
    error: null,
    setLoading: (loading) => set({ loading }),
    setResponse: (response) => set({ loading: false, ...response })
  };
});