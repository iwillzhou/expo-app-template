import { Storage } from 'src/utils';
import Constants from 'expo-constants';

const key = `LAUNCH_${Constants.expoConfig?.version}`;

export const getIsFirstLaunch = async () => {
    const value = await Storage.getItem(key);
    return value ? JSON.parse(value) : true;
};

export const setIsFirstLaunch = (value: boolean) => {
    return Storage.setItem(key, JSON.stringify(value));
};
