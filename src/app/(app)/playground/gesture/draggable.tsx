import React, { FC } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import Animated, { useSharedValue } from 'react-native-reanimated';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type DraggableBoxProps = {
    minDist?: number;
    boxStyle?: StyleProp<ViewStyle>;
};

export const DraggableBox: FC<DraggableBoxProps> = props => {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);

    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .minDistance(props.minDist || 0)
        .onUpdate(e => {
            translateX.value = x.value + e.translationX;
            translateY.value = y.value + e.translationY;
        })
        .onEnd(() => {
            x.value = translateX.value;
            y.value = translateY.value;
        });

    console.log(JSON.stringify(props.boxStyle));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                className="size-24 rounded-3xl absolute bg-[plum] m-2"
                style={[
                    styles.box,
                    props.boxStyle,
                    {
                        top: translateY,
                        left: translateX
                    }
                ]}
            />
        </GestureDetector>
    );
};

export default function Example() {
    return (
        <ScrollView className="flex-1">
            <DraggableBox />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    box: {
        width: 150,
        height: 150,
        position: 'absolute',
        backgroundColor: 'plum',
        margin: 10
    }
});
