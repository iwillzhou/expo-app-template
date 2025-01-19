import { View } from 'react-native';
import { Fragment } from 'react';
import { THEMES } from 'src/constants/theme';
import { useTheme } from 'src/hooks/use-theme';
import { useTranslation } from 'react-i18next';
import { TickStroke } from 'src/components/icons';
import { Button, Separator, Text } from 'src/components/ui';

export default function ThemeSetting() {
    const { t } = useTranslation('settings', { keyPrefix: 'theme' });
    const { theme, setTheme } = useTheme();
    return (
        <View className="grid grid-flow-col p-4 gap-4">
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
        </View>
    );
}
