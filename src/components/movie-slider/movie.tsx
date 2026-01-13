import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    item: {
        uri: string;
        title: string;
        ganre: string;
    };
    index: number;
    currentIndex: SharedValue<number>;
};

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.75;

const Movie = ({ item, index, currentIndex }: Props) => {
    const itemRStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        currentIndex.value,
                        [index - 1, index, index + 1],
                        [0.85, 1, 0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        };
    });

    const descRStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                currentIndex.value,
                [index - 1, index - 0.5, index, index + 1],
                [0, 0, 1, 0],
                Extrapolation.CLAMP
            )
        };
    });

    return (
        <Animated.View style={[{ flex: 1 }, itemRStyle]}>
            <Image source={{ uri: item.uri }} style={{ width: IMAGE_WIDTH, flex: 1, borderRadius: 22 }} />

            <Animated.View style={[{ marginVertical: 10, gap: 6 }, descRStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: 'grey',
                            paddingHorizontal: 4,
                            borderRadius: 4
                        }}
                    >
                        <Text>IMDB</Text>
                    </View>
                    <Text style={{ fontWeight: '600' }}>8.5</Text>
                </View>
                <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ color: 'grey' }}>{item.ganre}</Text>
            </Animated.View>
        </Animated.View>
    );
};

export default Movie;

const styles = StyleSheet.create({});
