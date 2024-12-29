import { View } from 'react-native';
import { Storage } from 'src/utils/storage';
import { useTranslation } from 'react-i18next';
import { TickStroke } from 'src/components/icons';
import { Fragment, useEffect, useState } from 'react';
import { Button, Separator, Switch, Text } from 'src/components/ui';
import { LANGUAGE_STORAGE_KEY, LANGUAGE_SYSTEM_OPTION } from 'src/i18n';

export default function LanguageSetting() {
    const { i18n } = useTranslation();
    const resource = i18n.services.resourceStore.data;
    const [langSetting, setLangeSetting] = useState<string>();

    useEffect(() => {
        async function fetchLangSetting() {
            const storeLangSetting = await Storage.getItem(LANGUAGE_STORAGE_KEY);
            const initialLangSetting =
                storeLangSetting === LANGUAGE_SYSTEM_OPTION ? LANGUAGE_SYSTEM_OPTION : i18n.resolvedLanguage;
            setLangeSetting(initialLangSetting);
        }
        fetchLangSetting();
    }, []);

    useEffect(() => {
        if (i18n.resolvedLanguage !== langSetting) {
            i18n.changeLanguage(langSetting);
        }
    }, [langSetting]);

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text>跟随系统</Text>
                        <Text className="text-muted-foreground">开启后语言会跟随系统设置</Text>
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
