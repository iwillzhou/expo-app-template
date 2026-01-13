import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function ItermsAndConditions() {
    return (
        <WebView className="flex-1" source={{ uri: 'https://jsparling.github.io/hashmarks/terms_and_conditions' }}>
            <Stack.Screen options={{ title: '服务协议' }} />
        </WebView>
    );
}
