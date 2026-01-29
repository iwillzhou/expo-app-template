import { useEffect } from 'react';
import { Uniwind } from 'uniwind';
import { useWindowDimensions } from 'react-native';
import { useFontScaleStore, nearestFontScale } from 'src/stores/font-scale';

export function useFontScale() {
    const { fontScale: systemFontScale } = useWindowDimensions();
    const { loading, followSystem, fontScale, setFontScale } = useFontScaleStore();

    useEffect(() => {
        if (followSystem) {
            const fontScale = nearestFontScale(systemFontScale);
            setFontScale(fontScale);
        }
    }, [systemFontScale, followSystem]);

    useEffect(() => {
        const v = { '--font-scale': fontScale };
        Uniwind.updateCSSVariables('light', v);
        Uniwind.updateCSSVariables('dark', v);
    }, [fontScale]);

    return { loading };
}
