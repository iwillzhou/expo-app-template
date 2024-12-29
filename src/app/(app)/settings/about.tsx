import { Link } from 'expo-router';
import Constants from 'expo-constants';
import { View, Image } from 'react-native';
import { ArrowRightStroke } from 'src/components/icons';
import { Button, Separator, Text } from 'src/components/ui';

export default function AboutSetting() {
    return (
        <View className="flex-1 p-4">
            <View className="my-6">
                <Image source={require('assets/images/icon.png')} className="size-24 mx-auto my-4" />
                <Text className="text-center">Version: {Constants.expoConfig?.version}</Text>
            </View>
            <View className="bg-secondary rounded-lg">
                <Link href="/home" asChild>
                    <Button variant="secondary" className="flex-row justify-between native:h-14">
                        <Text className="font-normal">检测更新</Text>
                        <ArrowRightStroke className="text-foreground" />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/home" asChild>
                    <Button variant="secondary" className="flex-row justify-between native:h-14">
                        <Text className="font-normal">用户协议</Text>
                        <ArrowRightStroke className="text-foreground" />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/home" asChild>
                    <Button variant="secondary" className="flex-row justify-between native:h-14">
                        <Text className="font-normal">隐私政策</Text>
                        <ArrowRightStroke className="text-foreground" />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/home" asChild>
                    <Button variant="secondary" className="flex-row justify-between native:h-14">
                        <Text className="font-normal">开源证书</Text>
                        <ArrowRightStroke className="text-foreground" />
                    </Button>
                </Link>
            </View>
        </View>
    );
}
