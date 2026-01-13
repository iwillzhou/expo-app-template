import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}

class AsyncStorageAdapter implements IStorage {
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

    async clear() {
        try {
            return await AsyncStorage.clear();
        } catch (error) {
            console.error('Failed to clear all items:', error);
        }
    }
}

export const Storage = new AsyncStorageAdapter();
