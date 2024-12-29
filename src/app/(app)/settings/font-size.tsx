import { View } from 'react-native';
import { Switch, Text } from 'src/components/ui';

export default function FontSizeSetting() {
    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <View className="bg-secondary rounded-lg px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text>跟随系统</Text>
                        <Text className="text-muted-foreground">开启后字体大小会跟随系统设置</Text>
                    </View>
                    <Switch checked={true} onCheckedChange={checked => {}} />
                </View>
            </View>
        </View>
    );
}
