import * as Burnt from 'burnt';
import { Text, Button } from 'src/components/ui';
import { ThemedView } from 'src/components/themed-view';

export default function BurntPlayground() {
    return (
        <ThemedView className="grid grid-flow-col gap-4 m-auto">
            <Button
                onPress={async () => {
                    Burnt.alert({
                        title: 'Download canceled.',
                        message: 'Please try again.',
                        preset: 'error'
                    });
                }}
            >
                <Text>Error Alert</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.alert({
                        title: 'Download completed.',
                        message: 'Check your history.',
                        preset: 'done'
                    });
                }}
            >
                <Text>Success Alert</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.alert({
                        title: 'Downloading...',
                        message: '',
                        preset: 'spinner',
                        duration: 30
                    });
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    await Burnt.dismissAllAlerts();
                    Burnt.alert({
                        title: 'Download completed.',
                        message: 'Check your history.',
                        preset: 'done'
                    });
                }}
            >
                <Text>Loading Alert</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.alert({
                        title: 'Verified account',
                        preset: 'custom',
                        icon: {
                            ios: {
                                name: 'checkmark.seal',
                                color: '#1D9BF0'
                            }
                        }
                    });
                }}
            >
                <Text>Custom Icon Alert</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.toast({
                        title: 'Payment failed.',
                        message: 'Please try again.',
                        preset: 'error'
                    });
                }}
            >
                <Text>Error Toast</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.toast({
                        title: 'Payment processed.',
                        message: 'Please see your orders.',
                        preset: 'done'
                    });
                }}
            >
                <Text>Success Toast</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.toast({
                        title: 'This toast has more Button, without an icon or a message.',
                        preset: 'none'
                    });
                }}
            >
                <Text>Without Icon Toast</Text>
            </Button>
            <Button
                onPress={async () => {
                    Burnt.toast({
                        title: 'This toast has more Button, and it also has a custom icon.',
                        preset: 'custom',
                        icon: {
                            ios: {
                                name: 'circle',
                                color: '#F7A51D'
                            }
                        },
                        duration: Infinity
                    });
                }}
            >
                <Text>Custom Icon Toast</Text>
            </Button>
        </ThemedView>
    );
}
