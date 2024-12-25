import { Redirect, useLocalSearchParams } from 'expo-router';

export default function MainScreen() {
    const { isFirstLaunch, isConnected } = useLocalSearchParams();

    if (isFirstLaunch === 'true') {
        return <Redirect href="/onboarding" />;
    } else if (isConnected === 'true') {
        return <Redirect href="/launch" />;
    }
    return <Redirect href="/home" />;
}
