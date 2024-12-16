import { Fragment } from 'react';
import { View } from 'react-native';
import { useTheme } from 'src/hooks/theme';
import { THEMES } from 'src/constants/theme';
import { useTranslation } from 'react-i18next';
import { TickStroke } from 'src/components/icons';
import { ColorSchemeSetting } from 'src/types/theme';
import { ThemedView } from 'src/components/themed-view';
import { Text, Button, Separator } from 'src/components/ui';

export default function DarkModeSetting() {
    const { t } = useTranslation('theme');
    const { theme, colorSchemeSetting, setColorSchemeSetting, setTheme } = useTheme();

    return (
        <ThemedView className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg">
                {['system', 'light', 'dark'].map((setting, index) => (
                    <Fragment key={setting}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between native:h-14"
                            onPress={() => setColorSchemeSetting(setting as ColorSchemeSetting)}
                        >
                            <Text className="font-normal">{t(setting)}</Text>
                            {setting === colorSchemeSetting && <TickStroke className="text-foreground" />}
                        </Button>
                    </Fragment>
                ))}
            </View>
            <View className="bg-secondary rounded-lg">
                {Object.keys(THEMES).map((value, index) => (
                    <Fragment key={value}>
                        {index !== 0 && <Separator className="mx-4 my-0 w-auto" />}
                        <Button
                            variant="secondary"
                            className="flex-row justify-between native:h-14"
                            onPress={() => setTheme(value)}
                        >
                            <Text className="font-normal">{t(value)}</Text>
                            {value === theme && <TickStroke className="text-foreground" />}
                        </Button>
                    </Fragment>
                ))}
            </View>
        </ThemedView>
    );
}
