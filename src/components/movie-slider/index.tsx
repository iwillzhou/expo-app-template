import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, { FadeInUp, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import data from './data';
import Movie from './movie';

type Props = {};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75 + 10;

const MoviesSlider = (props: Props) => {
    const currentIndex = useSharedValue(0);

    const handleScroll = useAnimatedScrollHandler({
        onScroll: event => {
            currentIndex.value = event.contentOffset.x / ITEM_WIDTH;
            // console.log(event.contentOffset.x / ITEM_WIDTH);
        }
    });
    return (
        <View className="flex-1 items-center gap-4">
            {/* <Animated.Text
                entering={FadeInUp.springify()}
                style={{
                    fontSize: 24,
                    fontWeight: '600',
                    paddingHorizontal: 16,
                    marginTop: 24
                }}
            >
                Top Searches
            </Animated.Text> */}
            <Animated.FlatList
                onScroll={handleScroll}
                entering={FadeInUp.delay(200).springify()}
                data={data}
                renderItem={({ item, index }) => (
                    <Movie currentIndex={currentIndex} key={index} item={item} index={index} />
                )}
                contentContainerStyle={{
                    height: '100%',
                    paddingLeft: 16,
                    gap: 10,
                    paddingRight: width - ITEM_WIDTH
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                snapToAlignment="center"
                decelerationRate="fast"
            />
        </View>
    );
};

export default MoviesSlider;
