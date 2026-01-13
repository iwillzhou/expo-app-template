import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Slider, Switch, Text } from 'src/components/ui';
import { FONT_SCALES, DEFAULT_FONT_SCALE, useFontScaleStore } from 'src/stores/font-scale';

interface StepMarkerProps {
    min: number;
    max: number;
    markValue: number;
}

export default function FontScaleSetting() {
    const { t } = useTranslation('settings');
    const { fontScale, setFontScale, followSystem, setFollowSystem } = useFontScaleStore();

    const handleSystemToggle = (followSystem: boolean) => {
        setFollowSystem(followSystem);
    };

    const handleScaleChange = (index: number) => {
        setFollowSystem(false);
        setFontScale(FONT_SCALES[index]);
    };

    return (
        <View className="flex-1 p-4 justify-between">
            <View className="gap-4">
                <View className="p-4 bg-secondary rounded-lg self-end">
                    <Text className="text-base">{t('fontScale.preview1')}</Text>
                </View>
                <View className="p-4 bg-secondary rounded-lg self-start">
                    <Text className="text-base">{t('fontScale.preview2')}</Text>
                </View>
                <View className="p-4 bg-secondary rounded-lg self-start">
                    <Text className="text-base">{t('fontScale.preview3')}</Text>
                </View>
            </View>
            <View className="bg-secondary rounded-xl p-4 gap-4">
                <View className="flex-row justify-between items-center">
                    <View className="shrink">
                        <Text>{t('fontScale.system')}</Text>
                        <Text className="text-muted-foreground text-sm">{t('fontScale.systemDesc')}</Text>
                    </View>
                    <Switch checked={followSystem} onCheckedChange={handleSystemToggle} />
                </View>
                <View className="pt-8 pb-4">
                    <Slider
                        animateTransitions
                        minimumValue={0}
                        maximumValue={FONT_SCALES.length - 1}
                        step={1}
                        value={FONT_SCALES.indexOf(fontScale)}
                        onValueChange={handleScaleChange}
                        StepMarker={({ min, max, markValue }: StepMarkerProps) => {
                            return (
                                <View className="h-2 border-[0.8px] border-secondary-foreground">
                                    {markValue === min && (
                                        <Text allowFontScaling={false} className="absolute -left-1 -top-10 text-sm">
                                            A
                                        </Text>
                                    )}
                                    {markValue === FONT_SCALES.indexOf(DEFAULT_FONT_SCALE) && (
                                        <Text
                                            allowFontScaling={false}
                                            className="absolute w-20 -left-10 -top-10 text-center"
                                        >
                                            {t('fontScale.default')}
                                        </Text>
                                    )}
                                    {markValue === max && (
                                        <Text allowFontScaling={false} className="absolute -left-2 -top-10 text-2xl">
                                            A
                                        </Text>
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
