import { View } from 'react-native';
import { Storage } from 'src/utils/storage';
import { getLocales } from 'expo-localization';
import { useTranslation } from 'react-i18next';
import { TickStroke } from 'src/components/icons';
import { Fragment, useEffect, useState } from 'react';
import { Button, Separator, Switch, Text } from 'src/components/ui';
import { LANGUAGE_SETTING_STORAGE_KEY, LANGUAGE_SYSTEM_OPTION } from 'src/i18n';

export default function LanguageSetting() {
    const { t, i18n } = useTranslation('settings', { keyPrefix: 'language' });
    const resource = i18n.services.resourceStore.data;
    const [langSetting, setLangeSetting] = useState<string>();

    useEffect(() => {
        async function fetchLangSetting() {
            const storeLangSetting = await Storage.getItem(LANGUAGE_SETTING_STORAGE_KEY);
            setLangeSetting(storeLangSetting || LANGUAGE_SYSTEM_OPTION);
        }
        fetchLangSetting();
    }, []);

    useEffect(() => {
        if (!langSetting) return;
        if (langSetting === LANGUAGE_SYSTEM_OPTION) {
            const { languageTag } = getLocales()[0];
            i18n.changeLanguage(languageTag);
        } else {
            i18n.changeLanguage(langSetting);
        }
        Storage.setItem(LANGUAGE_SETTING_STORAGE_KEY, langSetting!);
    }, [langSetting]);

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <View className="flex-shrink">
                        <Text>{t('system')}</Text>
                        <Text className="text-muted-foreground">{t('system_desc')}</Text>
                    </View>
                    <Switch
                        checked={langSetting === LANGUAGE_SYSTEM_OPTION}
                        onCheckedChange={checked => {
                            if (checked) {
                                setLangeSetting(LANGUAGE_SYSTEM_OPTION);
                            } else {
                                setLangeSetting(i18n.resolvedLanguage);
                            }
                        }}
                    />
                </View>
            </View>
            <View className="bg-secondary rounded-lg">
                {Object.keys(resource).map((lang, index) => (
                    <Fragment key={lang}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between native:h-14"
                            disabled={langSetting === LANGUAGE_SYSTEM_OPTION}
                            onPress={() => setLangeSetting(lang)}
                        >
                            <Text className="font-normal">{resource[lang]?.display as string}</Text>
                            {i18n.resolvedLanguage === lang && <TickStroke className="text-foreground" />}
                        </Button>
                    </Fragment>
                ))}
            </View>
        </View>
    );
}
