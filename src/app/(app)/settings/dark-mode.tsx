import { Fragment } from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from 'src/hooks/use-theme';
import { useTranslation } from 'react-i18next';
import { ColorSchemeSetting } from 'src/stores/theme';
import { Button, Icon, Separator, Switch, Text } from 'src/components/ui';

export default function DarkModeSetting() {
    const { t } = useTranslation('settings');
    const { colorScheme, colorSchemeSetting, setColorSchemeSetting } = useTheme();

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg p-4">
                <View className="flex-row justify-between items-center">
                    <View className="shrink">
                        <Text>{t('darkMode.system')}</Text>
                    </View>
                    <Switch
                        checked={colorSchemeSetting === ColorSchemeSetting.System}
                        onCheckedChange={checked =>
                            setColorSchemeSetting(
                                checked ? ColorSchemeSetting.System : (colorScheme as ColorSchemeSetting)
                            )
                        }
                    />
                </View>
            </View>
            <View className="bg-secondary rounded-lg">
                {[ColorSchemeSetting.Light, ColorSchemeSetting.Dark].map((setting, index) => (
                    <Fragment key={setting}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between h-auto min-h-14"
                            disabled={colorSchemeSetting === ColorSchemeSetting.System}
                            onPress={() => setColorSchemeSetting(setting as any)}
                        >
                            <Text className="font-normal leading-normal">{t(`darkMode.${setting}`)}</Text>
                            {setting === colorScheme && <Icon as={Check} className="text-foreground" />}
                        </Button>
                    </Fragment>
                ))}
            </View>
        </View>
    );
}
