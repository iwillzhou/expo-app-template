import { Link } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from 'src/hooks/use-auth';
import { ChevronRight, UserRound } from 'lucide-react-native';
import { PremiumCard } from 'src/components/premium-card';
import { Text, Avatar, AvatarFallback, AvatarImage, Card, Button } from 'src/components/ui';

export default function ProfileScreen() {
    const { profile, isAuthenticated } = useAuth();
    return (
        <View className="grid grid-flow-col p-4 gap-4">
            <Card className="flex-row items-center justify-between p-4 rounded-2xl bg-secondary">
                <View className="flex-row items-center space-x-3">
                    <Avatar alt="@mrzachnugent" className="border-background border-2 size-14">
                        <AvatarImage source={{ uri: profile?.avatar_url }} />
                        <AvatarFallback>
                            <UserRound />
                        </AvatarFallback>
                    </Avatar>
                    {isAuthenticated ? (
                        <View className="ml-4">
                            <Text className="text-foreground font-semibold">{profile?.username ?? '-'}</Text>
                            <Text className="text-secondary-foreground text-xs mt-0.5">ID: {profile?.id}</Text>
                        </View>
                    ) : (
                        <Link href="/log-in" asChild>
                            <Button variant="link" className="flex-col items-start gap-0">
                                <Text className="text-foreground font-semibold">登录</Text>
                                <Text className="text-secondary-foreground text-xs mt-0.5">点击前往登录</Text>
                            </Button>
                        </Link>
                    )}
                </View>
                <ChevronRight size={20} color="#9ca3af" />
            </Card>
            {/* <View className="p-4 flex-row items-center bg-secondary">
                <Text>Disposable Banner</Text>
            </View> */}
            <Link href="/paywall" asChild>
                <PremiumCard />
            </Link>
            <View className="p-4 flex-row items-center bg-secondary">
                <Text>Settigns</Text>
            </View>
        </View>
    );
}
