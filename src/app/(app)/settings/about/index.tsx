import Constants from 'expo-constants';
import { Link, Stack } from 'expo-router';
import { Image, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Button, Icon, Separator, Text } from 'src/components/ui';

export default function AboutSetting() {
    return (
        <View className="grid grid-flow-col gap-4 p-4">
            <Stack.Screen options={{ title: '关于' }} />
            <View className="my-6">
                <Image source={require('assets/images/icon.png')} className="size-24 mx-auto my-4" />
                <Text className="text-center">Version: {Constants.expoConfig?.version}</Text>
            </View>
            <View className="bg-secondary rounded-lg">
                <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                    <Text className="font-normal text-blue-700 leading-normal">检测更新</Text>
                    <Icon as={ChevronRight} />
                </Button>
            </View>
            <View className="bg-secondary rounded-lg">
                <Link href="/settings/about/iterms-and-conditions" asChild>
                    <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                        <Text className="font-normal leading-normal">用户协议</Text>
                        <Icon as={ChevronRight} />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/settings/about/privacy-policy" asChild>
                    <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                        <Text className="font-normal leading-normal">隐私政策</Text>
                        <Icon as={ChevronRight} />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/home" asChild>
                    <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                        <Text className="font-normal leading-normal">开源证书</Text>
                        <Icon as={ChevronRight} />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/home" asChild>
                    <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                        <Text className="font-normal leading-normal">个人信息清单</Text>
                        <Icon as={ChevronRight} />
                    </Button>
                </Link>
                <Separator className="mx-4 my-0 w-auto" />
                <Link href="/home" asChild>
                    <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                        <Text className="font-normal leading-normal">SDK共享清单</Text>
                        <Icon as={ChevronRight} />
                    </Button>
                </Link>
            </View>
        </View>
    );
}
