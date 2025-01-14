import { cssInterop } from 'nativewind';
import RNCSlider from '@react-native-community/slider';

const Slider = cssInterop(RNCSlider, {
    className: 'style',
    minimumTrackTintColorClassName: {
        target: false,
        nativeStyleToProp: { color: 'minimumTrackTintColor' }
    },
    maximumTrackTintColorClassName: {
        target: false,
        nativeStyleToProp: { color: 'maximumTrackTintColor' }
    },
    thumbTintColorClassName: {
        target: false,
        nativeStyleToProp: { color: 'thumbTintColor' }
    }
});

Slider.displayName = 'Slider';

export { Slider };
