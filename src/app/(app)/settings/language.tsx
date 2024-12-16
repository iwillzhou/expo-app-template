import { Fragment } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Separator, Text } from 'src/components/ui';

export default function LanguageSetting() {
    const { i18n } = useTranslation();
    const resource = i18n.services.resourceStore.data;
    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg">
                {Object.keys(resource).map((lang, index) => (
                    <Fragment key={lang}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between native:h-14"
                            onPress={() => i18n.changeLanguage(lang)}
                        >
                            <Text className="font-normal">{resource[lang]?.display as string}</Text>
                        </Button>
                    </Fragment>
                ))}
            </View>
        </View>
    );
}
