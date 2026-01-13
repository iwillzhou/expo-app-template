import { Fragment } from 'react';
import { View } from 'react-native';
import { Language } from 'src/i18n/config';
import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { getLanguageOptions } from 'src/i18n/utils/get-language-options';
import { Button, Icon, Separator, Text, Switch } from 'src/components/ui';
import { LANG_SETTING_SYSTEM, useLanguageStore } from 'src/stores/language';

export default function LanguageSetting() {
    const { t, i18n } = useTranslation('settings');
    const { languageSetting, setLanguageSetting } = useLanguageStore();

    const resolvedLanguage = i18n.resolvedLanguage;
    const options = getLanguageOptions(resolvedLanguage as Language);

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg p-4">
                <View className="flex-row justify-between items-center">
                    <Text>{t('language.system')}</Text>
                    <Switch
                        checked={languageSetting === 'system'}
                        onCheckedChange={checked =>
                            setLanguageSetting(checked ? LANG_SETTING_SYSTEM : resolvedLanguage!)
                        }
                    />
                </View>
            </View>
            <View className="bg-secondary rounded-lg">
                {options.map(({ label, value, localizedName }, index) => (
                    <Fragment key={value}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between items-center h-auto min-h-14"
                            onPress={() => setLanguageSetting(value)}
                            disabled={languageSetting === LANG_SETTING_SYSTEM}
                        >
                            <View className="flex-col justify-center items-start">
                                <Text className="text-foreground font-normal leading-normal">{label}</Text>
                                <Text className="text-xs/tight text-secondary-foreground opacity-75">
                                    {localizedName}
                                </Text>
                            </View>
                            {resolvedLanguage === value && <Icon as={Check} className="text-foreground" />}
                        </Button>
                    </Fragment>
                ))}
            </View>
        </View>
    );
}
