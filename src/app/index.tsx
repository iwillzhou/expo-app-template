import { toBoolean } from 'src/utils/to-boolean';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function MainScreen() {
    const { isFirstLaunch, isConnected } = useLocalSearchParams();

    if (toBoolean(isFirstLaunch)) {
        return <Redirect href="/onboarding" />;
    } else if (toBoolean(isConnected)) {
        return <Redirect href="/launch" />;
    }
    return <Redirect href="/home" />;
}
