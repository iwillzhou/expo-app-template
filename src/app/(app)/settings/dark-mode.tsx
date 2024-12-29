import { Fragment } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/hooks/use-theme';
import { TickStroke } from 'src/components/icons';
import { ColorSchemeSetting } from 'src/types/theme';
import { Text, Button, Separator, Switch } from 'src/components/ui';

export default function DarkModeSetting() {
    const { t } = useTranslation('theme');
    const { colorScheme, colorSchemeSetting, setColorSchemeSetting } = useTheme();

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text>{t('system')}</Text>
                        <Text className="text-muted-foreground">开启后深色模式会跟随系统设置</Text>
                    </View>
                    <Switch
                        checked={colorSchemeSetting === 'system'}
                        onCheckedChange={checked => setColorSchemeSetting(checked ? 'system' : colorScheme)}
                    />
                </View>
            </View>
            <View className="bg-secondary rounded-lg">
                {['light', 'dark'].map((setting, index) => (
                    <Fragment key={setting}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between native:h-14"
                            disabled={colorSchemeSetting === 'system'}
                            onPress={() => setColorSchemeSetting(setting as ColorSchemeSetting)}
                        >
                            <Text className="font-normal">{t(setting)}</Text>
                            {setting === colorScheme && <TickStroke className="text-foreground" />}
                        </Button>
                    </Fragment>
                ))}
            </View>
        </View>
    );
}
