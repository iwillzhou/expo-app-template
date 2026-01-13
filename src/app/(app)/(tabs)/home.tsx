import { rem } from 'nativewind';
import { View } from 'react-native';
import { Storage } from 'src/utils/storage';
import { Button, Text } from 'src/components/ui';
import { useFontScaleStore } from 'src/stores/font-scale';

export default function HomeScreen() {
    const { fontScale } = useFontScaleStore();

    return (
        <View className="flex-1 items-center justify-center bg-background gap-4">
            <Text>Home</Text>
            <Button onPress={() => Storage.clear()}>
                <Text allowFontScaling={false}>Clear storage</Text>
            </Button>
            <Text>Font Scale: {fontScale}</Text>
            <Text>REM: {rem.get()}</Text>
        </View>
    );
}
