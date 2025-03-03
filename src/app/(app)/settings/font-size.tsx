import { View } from 'react-native';
import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Text, Slider, Button } from 'src/components/ui';
import { useStore as useFontSizeStore } from 'src/stores/font-size';

const STEP = 4;
const MINI_REM = 10;
const MAX_REM = 22;

export default function FontSizeSetting() {
    const { t } = useTranslation('settings', { keyPrefix: 'font_size' });
    const { followSystem, customFontSize, setFollowSystem, setCustomFontSize } = useFontSizeStore();

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <View className="flex-shrink">
                        <Text>{t('system')}</Text>
                        <Text className="text-muted-foreground">{t('system_desc')}</Text>
                    </View>
                    <Switch onLayout={forceUpdate} checked={followSystem} onCheckedChange={setFollowSystem} />
                </View>
            </View>
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row items-center justify-center py-4">
                    <Button variant="ghost" size="icon" disabled={followSystem}>
                        <Text className="text-[28px] ios:pb-[2px]">—</Text>
                    </Button>
                    <Slider
                        tapToSeek
                        value={customFontSize}
                        onValueChange={setCustomFontSize}
                        disabled={followSystem}
                        step={STEP}
                        minimumValue={MINI_REM}
                        maximumValue={MAX_REM}
                        className="w-[80%] h-[19]"
                        StepMarker={({ stepMarked }) => {
                            return (
                                !stepMarked && (
                                    <View className="size-[20] bg-transparent justify-center items-center">
                                        <View className="size-[6] rounded-full bg-secondary-foreground opacity-75" />
                                    </View>
                                )
                            );
                        }}
                        maximumTrackTintColorClassName="color-primary"
                        minimumTrackTintColorClassName="color-primary"
                    />
                    <Button variant="ghost" size="icon" disabled={followSystem}>
                        <Text className="text-[28px] ios:pb-[2px]">+</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
