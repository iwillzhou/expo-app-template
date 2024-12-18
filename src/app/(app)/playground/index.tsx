import { Fragment } from 'react';
import { View } from 'react-native';
import { Link, Href } from 'expo-router';
import { ThemedView } from 'src/components/themed-view';
import { ArrowRightStroke } from 'src/components/icons';
import { Text, Button, Separator } from 'src/components/ui';

interface SettingItem {
    key: string;
    title: string;
    href: Href;
}

export default function PlaygroundHome() {
    const settings: SettingItem[][] = [
        [
            {
                key: 'gesture',
                title: 'gesture',
                href: '/playground/gesture'
            },
            {
                key: 'bottome-sheet',
                title: 'bottome-sheet',
                href: '/playground/bottome-sheet'
            },
            {
                key: 'burnt',
                title: 'burnt',
                href: '/playground/burnt'
            }
        ],
        [
            {
                key: 'home',
                title: 'home',
                href: '/'
            }
        ]
    ];

    return (
        <ThemedView className="grid grid-flow-col p-4 gap-4">
            {settings.map(settingCard => (
                <View className="bg-secondary rounded-lg" key={settingCard.map(i => i.key).join()}>
                    {settingCard.map((item, index) => (
                        <Fragment key={item.key}>
                            {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                            <Link href={item.href} asChild>
                                <Button variant="secondary" className="flex-row justify-between native:h-14">
                                    <Text className="font-normal">{item.title}</Text>
                                    <ArrowRightStroke />
                                </Button>
                            </Link>
                        </Fragment>
                    ))}
                </View>
            ))}
        </ThemedView>
    );
}
