import { Card } from 'src/components/ui';
import { View, Text, Pressable } from 'react-native';
import { Crown, ChevronRight, ChessQueen } from 'lucide-react-native';
import { useEntitlement } from 'src/hooks/use-entitlement';
import { useAuth } from 'src/hooks/use-auth';

export function PremiumCard({ onPress }: { onPress?: () => void }) {
    const { isPro } = useEntitlement();
    const { isAuthenticated } = useAuth();
    return (
        <Pressable onPress={onPress}>
            <Card className="flex-row items-center justify-between p-4 rounded-2xl bg-[#111827]">
                <View className="flex-row items-center space-x-3">
                    <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                        <Crown size={20} color="white" />
                    </View>
                    <View className="ml-4">
                        <Text className="text-white font-semibold">
                            {isAuthenticated && isPro ? 'VIP会员' : '成为VIP会员'}
                        </Text>
                        <Text className="text-gray-300 text-xs mt-0.5">升级解锁全部功能，点击查看详情</Text>
                    </View>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
            </Card>
        </Pressable>
    );
}
