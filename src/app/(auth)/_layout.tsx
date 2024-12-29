import { Button } from 'src/components/ui';
import { Stack, router } from 'expo-router';
import { ArrowLeftStroke } from 'src/components/icons';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerLeft: ({ canGoBack }) =>
                    canGoBack && (
                        <Button variant="ghost" size="icon" onPress={() => router.back()} className="rounded-full">
                            <ArrowLeftStroke className="text-foreground" />
                        </Button>
                    ),
                headerShadowVisible: false,
                headerTitle: ''
            }}
        />
    );
}
