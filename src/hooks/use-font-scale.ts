import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useFontScaleStore, nearestFontScale } from 'src/stores/font-scale';

export function useFontScale() {
    const { fontScale: systemFontScale } = useWindowDimensions();
    const { loading, followSystem, setFontScale } = useFontScaleStore();

    useEffect(() => {
        if (followSystem) {
            const fontScale = nearestFontScale(systemFontScale);
            setFontScale(fontScale);
        }
    }, [systemFontScale, followSystem]);

    return { loading };
}
