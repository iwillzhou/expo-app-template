import 'expo-sqlite/localStorage/install';

interface IStorage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}

class LocalStorageAdapter implements IStorage {
    async getItem(key: string) {
        try {
            return globalThis.localStorage!.getItem(key);
        } catch (error) {
            console.error('Failed to get item from storage:', error);
            return null;
        }
    }

    async setItem(key: string, value: string) {
        try {
            globalThis.localStorage!.setItem(key, value);
        } catch (error) {
            console.error('Failed to set item:', error);
        }
    }

    async removeItem(key: string) {
        try {
            globalThis.localStorage!.removeItem(key);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    }

    async clear() {
        try {
            globalThis.localStorage!.clear();
        } catch (error) {
            console.error('Failed to clear all items:', error);
        }
    }
}

export const Storage = new LocalStorageAdapter();
