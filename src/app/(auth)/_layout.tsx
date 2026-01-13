import { Button } from 'src/components/ui';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function AuthLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerLeft: ({ canGoBack }) =>
                    canGoBack && (
                        <Button variant="ghost" size="icon" onPress={() => router.back()} className="rounded-full">
                            <ChevronLeft className="text-foreground" />
                        </Button>
                    ),
                headerShadowVisible: false,
                headerTitle: ''
            }}
        />
    );
}
