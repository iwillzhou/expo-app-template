import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageInterface {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}

class AsyncStorageAdapter implements StorageInterface {
    async getItem(key: string) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('Failed to get item from AsyncStorage:', error);
            return null;
        }
    }

    async setItem(key: string, value: string) {
        try {
            return await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Failed to set item:', error);
        }
    }

    async removeItem(key: string) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    }
}

class StorageManager implements StorageInterface {
    private storage: StorageInterface;

    constructor() {
        this.storage = new AsyncStorageAdapter();
    }

    async getItem(key: string) {
        return this.storage.getItem(key);
    }

    async setItem(key: string, value: string) {
        await this.storage.setItem(key, value);
    }

    async removeItem(key: string) {
        await this.storage.removeItem(key);
    }
}

export const Storage = new StorageManager();
