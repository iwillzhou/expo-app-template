import { useTheme } from 'src/hooks/theme';
import { View, ViewProps } from 'react-native';

const ThemedView = ({ children, ...props }: ViewProps) => {
    const { colors } = useTheme();
    return (
        <View style={colors} {...props}>
            {children}
        </View>
    );
};

export { ThemedView };
