import { create } from 'zustand';

interface RequestState {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: any;
  setMethod: (method: string) => void;
  setUrl: (url: string) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  method: 'GET',
  url: '',
  headers: {},
  body: null,
  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url })
}));