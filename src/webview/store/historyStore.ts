import { create } from 'zustand';

interface HistoryItem {
  request: any;
  response: any;
  timestamp: number;
}

interface HistoryState {
  history: HistoryItem[];
  loadHistory: (items: HistoryItem[]) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  loadHistory: (history) => set({ history }),
  clearHistory: () => set({ history: [] })
}));