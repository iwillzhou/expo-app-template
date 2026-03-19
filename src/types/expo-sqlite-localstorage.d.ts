interface ExpoLocalStorage {
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    readonly length: number;
}

declare global {
    var localStorage: ExpoLocalStorage | undefined;
}

export {};
