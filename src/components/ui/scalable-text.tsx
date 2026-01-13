import { rem } from 'nativewind';
import React from 'react';
import { useFontScaleStore } from 'src/stores/font-scale';
import { Text } from './text';

type ScalableTextProps = React.ComponentProps<typeof Text> & {
    baseSize?: number;
};

export const ScalableText: React.FC<ScalableTextProps> = ({
    className = '',
    children,
    style,
    baseSize = rem.get(),
    allowFontScaling = true,
    ...props
}) => {
    const { fontScale } = useFontScaleStore();

    // 解析 NativeWind 类名中的字体大小
    const parseFontSizeFromClassName = () => {
        const sizeRegex = /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[?[\d.]+\]?)/;
        const match = className.match(sizeRegex);

        if (match) {
            const size = match[1];
            const sizeMap: Record<string, number> = {
                xs: 0.75,
                sm: 0.875,
                base: 1,
                lg: 1.125,
                xl: 1.25,
                '2xl': 1.5,
                '3xl': 1.875,
                '4xl': 2.25,
                '5xl': 3,
                '6xl': 3.75,
                '7xl': 4.5,
                '8xl': 6,
                '9xl': 8
            };

            if (size in sizeMap) {
                return sizeMap[size] * baseSize;
            }

            // 处理自定义尺寸如 text-[18px]
            if (size.startsWith('[')) {
                const num = parseFloat(size.replace(/[\[\]px]/g, ''));
                return isNaN(num) ? baseSize : num;
            }
        }

        return baseSize;
    };

    const baseFontSize = parseFontSizeFromClassName();

    return (
        <Text
            className={className}
            style={[
                style,
                allowFontScaling && {
                    fontSize: baseFontSize * fontScale
                }
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
