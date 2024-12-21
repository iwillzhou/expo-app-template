import { useRef } from 'react';
import LottieView from 'lottie-react-native';
import { View, LayoutChangeEvent } from 'react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';

interface ScreenProps {
    onLayout: (event: LayoutChangeEvent) => void;
    onAnimationFinish: (isCancelled: boolean) => void;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashScreen = ({ onLayout, onAnimationFinish }: ScreenProps) => {
    const animation = useRef<LottieView>(null);

    return (
        <View className="flex-1 justify-center items-center bg-[#221F1F]" onLayout={onLayout}>
            <AnimatedLottieView
                exiting={ZoomOut}
                ref={animation}
                autoPlay
                loop={false}
                speed={1}
                style={{
                    width: '80%',
                    maxWidth: 400,
                    height: 400
                }}
                onAnimationFinish={onAnimationFinish}
                source={require('assets/lottie/netflix.json')}
            />
        </View>
    );
};

export default AnimatedSplashScreen;
