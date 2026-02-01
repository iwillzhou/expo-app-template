import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import { Button, Icon, Separator, Text } from 'src/components/ui';

export default function AccountSetting() {
    return (
        <View className="grid grid-flow-col gap-4 p-4">
            <View className="bg-secondary rounded-lg">
                <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                    <Text className="font-normal leading-normal">邮箱</Text>
                    <Icon as={ChevronRight} />
                </Button>
                <Separator className="mx-4 my-0 w-auto" />
                <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                    <Text className="font-normal leading-normal">手机号</Text>
                    <Icon as={ChevronRight} />
                </Button>
                <Separator className="mx-4 my-0 w-auto" />
                <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                    <Text className="font-normal leading-normal">Google</Text>
                    <Icon as={ChevronRight} />
                </Button>
            </View>
            <View className="bg-secondary rounded-lg">
                <Button variant="ghost" className="flex-row justify-between h-auto min-h-14">
                    <Text className="font-normal leading-normal">修改密码</Text>
                    <Icon as={ChevronRight} />
                </Button>
            </View>
            <Button variant="destructive" className="h-auto min-h-10">
                <Text className="leading-normal">注销账号</Text>
            </Button>
        </View>
    );
}
