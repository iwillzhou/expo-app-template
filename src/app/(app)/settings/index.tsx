import { Fragment } from 'react';
import { View } from 'react-native';
import { Link, Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedView } from 'src/components/themed-view';
import { ArrowRightStroke } from 'src/components/icons';
import { Text, Button, Separator } from 'src/components/ui';

interface SettingItem {
    key: string;
    title: string;
    href: Href;
}

export default function Settings() {
    const { t } = useTranslation('settings');

    const settings: SettingItem[][] = [
        [
            {
                key: 'account',
                title: t('account'),
                href: '/'
            }
        ],
        [
            {
                key: 'general',
                title: t('general'),
                href: '/'
            },
            {
                key: 'notification',
                title: t('notification'),
                href: '/'
            },
            {
                key: 'language',
                title: t('language'),
                href: '/settings/language'
            },
            {
                key: 'darkMode',
                title: t('darkMode'),
                href: '/settings/dark-mode'
            }
        ],
        [
            {
                key: 'privacy',
                title: t('privacy'),
                href: '/'
            },
            {
                key: 'about',
                title: t('about'),
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
            <Button variant="default">
                <Text>{t('switchAccount')}</Text>
            </Button>
            <Button variant="outline">
                <Text>{t('logout')}</Text>
            </Button>
        </ThemedView>
    );
}
