import { Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { useTheme } from 'src/hooks/use-theme';
import * as NavigationBar from 'expo-navigation-bar';
import { View, LayoutChangeEvent } from 'react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ScreenProps {
    onLayout: (event: LayoutChangeEvent) => void;
    onAnimationFinish: (isCancelled: boolean) => void;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashScreen = ({ onLayout, onAnimationFinish }: ScreenProps) => {
    const animation = useRef<LottieView>(null);
    const { navTheme } = useTheme();

    useEffect(() => {
        if (Platform.OS !== 'android') return;
        NavigationBar.setBackgroundColorAsync('#221F1F');
        return () => {
            NavigationBar.setBackgroundColorAsync(navTheme.colors.background);
        };
    }, []);

    return (
        <GestureHandlerRootView>
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
        </GestureHandlerRootView>
    );
};

export default AnimatedSplashScreen;
