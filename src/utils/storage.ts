import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageInterface {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}

class AsyncStorageAdapter implements StorageInterface {
    async getItem(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    }

    async setItem(key: string, value: string): Promise<void> {
        await AsyncStorage.setItem(key, value);
    }

    async removeItem(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }
}

class StorageManager implements StorageInterface {
    private storage: StorageInterface;

    constructor() {
        this.storage = new AsyncStorageAdapter();
    }

    async getItem(key: string): Promise<string | null> {
        return this.storage.getItem(key);
    }

    async setItem(key: string, value: string): Promise<void> {
        await this.storage.setItem(key, value);
    }

    async removeItem(key: string): Promise<void> {
        await this.storage.removeItem(key);
    }
}

export const Storage = new StorageManager();
