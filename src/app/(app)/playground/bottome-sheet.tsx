import { View } from 'react-native';
import { useCallback, useRef } from 'react';
import { Button, Text } from 'src/components/ui';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

export default function BottomSheetPlayground() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <View className="flex-1 justify-center items-center">
            <Button onPress={handlePresentModalPress} variant="outline">
                <Text>Present Modal</Text>
            </Button>
            <BottomSheetModal ref={bottomSheetModalRef}>
                <BottomSheetView className="flex-1 p-6 h-64">
                    <Text>Awesome 🎉</Text>
                    <Text>Awesome 🎉</Text>
                    <Text>Awesome 🎉</Text>
                    <Text>Awesome 🎉</Text>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
}
