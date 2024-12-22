import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text } from 'src/components/ui';
import { useBasicInfo } from 'src/hooks/queries/auth';
import { ThemedView } from 'src/components/themed-view';
import { setIsFirstLaunch } from 'src/utils/is-first-launch';

export default function Launch() {
    const router = useRouter();
    const { data: basicInfo } = useBasicInfo();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!!basicInfo?.session?.user) {
                router.replace('/home');
            } else {
                router.replace('/log-in');
            }
            setIsFirstLaunch(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [basicInfo]);
    return (
        <ThemedView className="flex-1 items-center justify-center">
            <Text>Launch</Text>
        </ThemedView>
    );
}
