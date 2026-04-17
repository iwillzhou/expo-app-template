import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Href, Link, Stack } from 'expo-router';
import { useSignOut } from 'src/hooks/queries/auth';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Icon, Separator, Text } from 'src/components/ui';
import {
    LucideIcon,
    ChevronRight,
    User2,
    BellRing,
    Languages,
    SunMoonIcon,
    MessageSquareText,
    Info,
    ALargeSmall
} from 'lucide-react-native';

interface SettingItem {
    key: string;
    title: string;
    icon: LucideIcon;
    href: Href;
}

export default function Settings() {
    const { t } = useTranslation('settings');
    const signOutMutation = useSignOut();

    const settings: SettingItem[][] = [
        [
            {
                key: 'account',
                title: t('index.account'),
                icon: User2,
                href: '/settings/account'
            }
        ],
        [
            {
                key: 'notification',
                title: t('index.notification'),
                icon: BellRing,
                href: '/home'
            },
            {
                key: 'language',
                title: t('index.language'),
                icon: Languages,
                href: '/settings/language'
            },
            {
                key: 'fontScale',
                title: t('index.fontScale'),
                icon: ALargeSmall,
                href: '/settings/font-scale'
            },
            {
                key: 'darkMode',
                title: t('index.darkMode'),
                icon: SunMoonIcon,
                href: '/settings/dark-mode'
            }
        ],
        [
            {
                key: 'feedback',
                title: t('index.feedback'),
                icon: MessageSquareText,
                href: '/home'
            },
            {
                key: 'about',
                title: t('index.about'),
                icon: Info,
                href: '/settings/about'
            }
        ]
    ];

    const onLogout = () => {
        // double check
        Alert.alert(
            '退出登录', // Required: Title of the alert
            '退出登录后不会丢失任何数据，您仍可以登录此账户', // Optional: Message of the alert
            [
                {
                    text: '取消',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel' // iOS only: style can be 'default', 'cancel', or 'destructive'
                },
                {
                    text: '退出登录',
                    onPress: () => {
                        signOutMutation.mutate();
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: false } // Optional: Options, e.g., prevent dismissing by tapping outside on Android
        );
    };

    return (
        <ScrollView>
            <Stack.Screen options={{ title: 'Settings' }} />
            <View className="grid grid-flow-col p-4 gap-4">
                {settings.map(settingCard => (
                    <View className="bg-secondary rounded-lg" key={settingCard.map(i => i.key).join()}>
                        {settingCard.map((item, index) => (
                            <Fragment key={item.key}>
                                {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                                <Link href={item.href} asChild>
                                    <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                                        <View className="flex-row items-center">
                                            <Icon as={item.icon} />
                                            <Text className="font-normal leading-normal ms-4">{item.title}</Text>
                                        </View>
                                        <Icon as={ChevronRight} />
                                    </Button>
                                </Link>
                            </Fragment>
                        ))}
                    </View>
                ))}
                <Button variant="destructive" className="h-auto min-h-10" onPress={onLogout}>
                    <Text className="leading-normal">{t('index.logout')}</Text>
                </Button>
            </View>
        </ScrollView>
    );
}
