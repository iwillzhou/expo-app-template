import { Redirect } from 'expo-router';
import { useLaunchInfoStore } from 'src/stores/launch-info';

export default function MainScreen() {
    const { isFirstLaunch } = useLaunchInfoStore();

    if (isFirstLaunch) {
        return <Redirect href="/onboarding" />;
    }
    return <Redirect href="/launch" />;
}
