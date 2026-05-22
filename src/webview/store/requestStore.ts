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
  auth: { type: string; token?: string } | null;
  setMethod: (method: string) => void;
  setUrl: (url: string) => void;
  addHeader: () => void;
  updateHeader: (idx: number, field: keyof Header, value: string) => void;
  removeHeader: (idx: number) => void;
  setBody: (body: any) => void;
  setAuth: (auth: any) => void;
  loadFromHistory: (request: any) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  method: 'GET',
  url: '',
  headers: [],
  body: null,
  auth: null,
  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url }),
  addHeader: () => set((state) => ({ headers: [...state.headers, { key: '', value: '' }] })),
  updateHeader: (idx, field, value) => set((state) => {
    const newHeaders = [...state.headers];
    newHeaders[idx][field] = value;
    return { headers: newHeaders };
  }),
  removeHeader: (idx) => set((state) => ({ headers: state.headers.filter((_, i) => i !== idx) })),
  setBody: (body) => set({ body }),
  setAuth: (auth) => set({ auth }),
  loadFromHistory: (request) => {
    let headersArray: Header[] = [];
    if (request.headers) {
      if (Array.isArray(request.headers)) {
        headersArray = request.headers;
      } else if (typeof request.headers === 'object') {
        headersArray = Object.entries(request.headers).map(([key, value]) => ({ key, value: String(value) }));
      }
    }
    set({
      method: request.method || 'GET',
      url: request.url || '',
      headers: headersArray,
      body: request.body !== undefined ? request.body : null,
      auth: request.auth || null
    });
  }
}));