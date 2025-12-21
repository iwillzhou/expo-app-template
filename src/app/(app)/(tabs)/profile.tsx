import { Link } from 'expo-router';
import { View } from 'react-native';
import { useUser } from 'src/hooks/queries/auth';
import { EditStroke, CrownSolid } from 'src/components/icons';
import { Avatar, AvatarFallback, AvatarImage, Button, Text } from 'src/components/ui';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function ProfileScreen() {
    const { data: user } = useUser();
    return (
        <View className="flex-1">
            <View className="flex-row items-center p-4">
                <Avatar alt="Zach Nugent's Avatar" className="size-20">
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                        <Text>NZ</Text>
                    </AvatarFallback>
                </Avatar>
                {user ? (
                    <View className="flex-1 flex-row justify-between ml-4">
                        <View>
                            <Text>{user.email}</Text>
                            <Text>ID: {user.id.slice(0, 8)}</Text>
                        </View>
                        <Button variant="ghost" size="icon" className="mx-4 rounded-full">
                            <EditStroke className="text-foreground" />
                        </Button>
                    </View>
                ) : (
                    <Link href="/log-in" asChild>
                        <Button variant="link">
                            <Text className="text-foreground font-normal">立即登录</Text>
                        </Button>
                    </Link>
                )}
            </View>
            <View className="flex-row justify-between items-center p-4 m-4 rounded-xl bg-gray-400">
                <View className="flex-row items-center gap-4">
                    <CrownSolid color="#FFB800" />
                    <View>
                        <Text className="text-xl">高级会员</Text>
                        <Text className="text-secondary-foreground">享受更丰富的会员专属权益</Text>
                    </View>
                </View>
                <Button variant="outline" className="rounded-full">
                    <Text>升级</Text>
                </Button>
            </View>
        </View>
    );
}
