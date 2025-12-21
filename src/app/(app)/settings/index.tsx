import { Fragment } from 'react';
import { Link, Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from 'react-native';
import { useSignOut } from 'src/hooks/queries/auth';
import { ArrowRightStroke } from 'src/components/icons';
import { Text, Button, Separator } from 'src/components/ui';

interface SettingItem {
    key: string;
    title: string;
    href: Href;
}

export default function Settings() {
    const { t } = useTranslation('settings', { keyPrefix: 'index' });

    const signOutMutation = useSignOut();

    const settings: SettingItem[][] = [
        [
            {
                key: 'account',
                title: t('account'),
                href: '/home'
            }
        ],
        [
            {
                key: 'general',
                title: t('general'),
                href: '/home'
            },
            {
                key: 'notification',
                title: t('notification'),
                href: '/home'
            },
            {
                key: 'language',
                title: t('language'),
                href: '/settings/language'
            },
            {
                key: 'fontSize',
                title: t('font_size'),
                href: '/settings/font-size'
            },
            {
                key: 'theme',
                title: t('theme'),
                href: '/settings/theme'
            },
            {
                key: 'darkMode',
                title: t('dark_mode'),
                href: '/settings/dark-mode'
            }
        ],
        [
            {
                key: 'feedback',
                title: t('feedback'),
                href: '/home'
            },
            {
                key: 'about',
                title: t('about'),
                href: '/settings/about'
            }
        ]
    ];

    const onLogout = () => {
        // double check
        signOutMutation.mutate();
    };

    return (
        <ScrollView>
            <View className="grid grid-flow-col p-4 gap-4">
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
                <Button variant="default">
                    <Text>{t('switch_account')}</Text>
                </Button>
                <Button variant="outline" onPress={onLogout}>
                    <Text>{t('logout')}</Text>
                </Button>
            </View>
        </ScrollView>
    );
}
