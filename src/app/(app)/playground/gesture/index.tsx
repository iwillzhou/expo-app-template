import { View } from 'react-native';
import { Link, Href } from 'expo-router';
import { Text, Button } from 'src/components/ui';
import { ArrowRightStroke } from 'src/components/icons';

interface SettingItem {
    key: string;
    title: string;
    href: Href;
}

export default function GuestureHome() {
    const settings: SettingItem[] = [
        {
            key: 'draggable',
            title: 'draggable',
            href: '/playground/gesture/draggable'
        },
        {
            key: 'fling',
            title: 'fling',
            href: '/playground/gesture/fling'
        },
        {
            key: 'longpress',
            title: 'longpress',
            href: '/playground/gesture/longpress'
        },
        {
            key: 'tap',
            title: 'tap',
            href: '/playground/gesture/tap'
        },
        {
            key: 'manual',
            title: 'manual',
            href: '/playground/gesture/manual'
        }
    ];

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            {settings.map(item => (
                <Link key={item.key} href={item.href} asChild>
                    <Button variant="secondary" className="flex-row justify-between native:h-14">
                        <Text className="font-normal">{item.title}</Text>
                        <ArrowRightStroke />
                    </Button>
                </Link>
            ))}
        </View>
    );
}
