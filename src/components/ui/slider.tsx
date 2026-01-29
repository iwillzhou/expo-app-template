import { cn } from 'src/utils/cn';
import { withUniwind } from 'uniwind';
import { Slider as RNSlider } from '@react-native-assets/slider';

const CustomizedSlider = withUniwind(RNSlider);

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
