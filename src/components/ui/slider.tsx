import { Slider as RNSlider } from '@react-native-assets/slider';
import { cssInterop } from 'nativewind';
import { cn } from 'src/utils/cn';

const CustomizedSlider = cssInterop(RNSlider as unknown as React.ComponentType<any>, {
    trackClassName: 'trackStyle',
    thumbClassName: 'thumbStyle',
    minTrackClassName: 'minTrackStyle',
    maxTrackClassName: 'maxTrackStyle',
    maximumTrackTintColorClassName: {
        target: false,
        nativeStyleToProp: { color: 'maximumTrackTintColor' }
    },
    minimumTrackTintColorClassName: {
        target: false,
        nativeStyleToProp: { color: 'minimumTrackTintColor' }
    },
    thumbTintColorClassName: {
        target: false,
        nativeStyleToProp: { color: 'thumbTintColor' }
    }
});

function Slider({
    thumbClassName,
    trackClassName,
    ...props
}: React.ComponentProps<typeof CustomizedSlider> & React.RefAttributes<typeof CustomizedSlider>) {
    return (
        <CustomizedSlider
            thumbClassName={cn('bg-white size-6 rounded-full shadow-xl', thumbClassName)}
            trackClassName={cn('bg-muted-foreground h-[1.5]', trackClassName)}
            {...props}
        />
    );
}

export { Slider };
