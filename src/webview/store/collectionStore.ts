import { create } from 'zustand';
import { Collection } from '@shared/types/collection.types';
import { useRequestStore } from './requestStore';

interface CollectionState {
  collections: Collection[];
  loadCollections: (cols: Collection[]) => void;
  addCollection: (col: Collection) => void;
  deleteCollection: (id: string) => void;
  selectRequest: (req: any) => void;
}

export const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  loadCollections: (collections) => set({ collections }),
  addCollection: (col) => set((state) => ({ collections: [...state.collections, col] })),
  deleteCollection: (id) => set((state) => ({ collections: state.collections.filter(c => c.id !== id) })),
  selectRequest: (req) => {
    console.log('[DEBUG] selectRequest called with', req);
    if (!req) {
      console.error('Request is null or undefined');
      return;
    }
    // Directly call loadFromHistory from the request store
    useRequestStore.getState().loadFromHistory(req);
  }
}));