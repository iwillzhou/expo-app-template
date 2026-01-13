import { Image } from 'expo-image';
import { Platform } from 'react-native';
import { Button } from 'src/components/ui';
import { useTheme } from 'src/hooks/use-theme';

export function AppleLogInButton() {
    const { colorScheme } = useTheme();

    async function onSignInButtonPress() {}

    return (
        <Button variant="outline" size="sm" className="flex-1" onPress={onSignInButtonPress}>
            <Image
                source="https://img.clerk.com/static/apple.png?width=160"
                style={{ width: 16, height: 16 }}
                tintColor={Platform.select({
                    native: colorScheme === 'dark' ? 'white' : 'black'
                })}
            />
        </Button>
    );
}
