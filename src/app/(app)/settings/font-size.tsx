/**
 * @file font size setting
 *
 * 半成品, 配置并没有真正生效
 * followSystem = true, Text的 allowFontScaling = true
 * followSystem = false, 希望能够直接设置font scale，但没有对应API；退而求其次，想跟主题对齐，看能不能设置字体变量，先不搞了
 *
 */

import React from 'react';
import { View } from 'react-native';
import useFontSizeStore from 'src/stores/font-size';
import { Switch, Text, Slider } from 'src/components/ui';

export default function FontSizeSetting() {
    const { followSystem, customFontSize, setFollowSystem, setCustomFontSize } = useFontSizeStore();

    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text>跟随系统</Text>
                        <Text className="text-muted-foreground">开启后字体大小会跟随系统设置</Text>
                    </View>
                    <Switch checked={followSystem} onCheckedChange={setFollowSystem} />
                </View>
            </View>
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row items-center justify-evenly py-4">
                    <Text className="text-2xl ios:pb-1">—</Text>
                    <Slider
                        tapToSeek
                        value={customFontSize}
                        onValueChange={setCustomFontSize}
                        disabled={followSystem}
                        step={4}
                        minimumValue={10}
                        maximumValue={22}
                        className="w-[85%] h-[19]"
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
                    <Text className="text-2xl ios:pb-1">+</Text>
                </View>
            </View>
        </View>
    );
}
