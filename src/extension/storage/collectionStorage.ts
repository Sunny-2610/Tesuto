import * as vscode from 'vscode';
import { Collection } from '@shared/types/collection.types';

const COLLECTIONS_KEY = 'tesuto-collections';

export class CollectionStorage {
  private static getContext(): vscode.ExtensionContext {
    return (global as any).extensionContext;
  }

  static getCollections(): Collection[] {
    return this.getContext().globalState.get<Collection[]>(COLLECTIONS_KEY, []);
  }

  static saveCollection(collection: Collection): Collection[] {
    const collections = this.getCollections();
    const existingIndex = collections.findIndex(c => c.id === collection.id);
    if (existingIndex >= 0) {
      collections[existingIndex] = collection;
    } else {
      collections.push(collection);
    }
    this.getContext().globalState.update(COLLECTIONS_KEY, collections);
    return collections;
  }

  static deleteCollection(id: string): Collection[] {
    const collections = this.getCollections().filter(c => c.id !== id);
    this.getContext().globalState.update(COLLECTIONS_KEY, collections);
    return collections;
  }
}