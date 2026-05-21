import { create } from 'zustand';

export interface Header {
  key: string;
  value: string;
}

interface RequestState {
  method: string;
  url: string;
  headers: Header[];
  body: any;
  setMethod: (method: string) => void;
  setUrl: (url: string) => void;
  addHeader: () => void;
  updateHeader: (idx: number, field: keyof Header, value: string) => void;
  removeHeader: (idx: number) => void;
  setBody: (body: any) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  method: 'GET',
  url: '',
  headers: [],
  body: null,
  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url }),
  addHeader: () => set((state) => ({ headers: [...state.headers, { key: '', value: '' }] })),
  updateHeader: (idx, field, value) => set((state) => {
    const newHeaders = [...state.headers];
    newHeaders[idx][field] = value;
    return { headers: newHeaders };
  }),
  removeHeader: (idx) => set((state) => ({ headers: state.headers.filter((_, i) => i !== idx) })),
  setBody: (body) => set({ body })
}));