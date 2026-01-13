import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function PrivacyPolicy() {
    return (
        <WebView className="flex-1" source={{ uri: 'https://jsparling.github.io/hashmarks/privacy' }}>
            <Stack.Screen options={{ title: '隐私政策' }} />
        </WebView>
    );
}
