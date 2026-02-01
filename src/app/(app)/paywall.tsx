import { cn } from 'src/utils/cn';
import { withUniwind } from 'uniwind';
import { useEffect, useState } from 'react';
import { Crown, Check, ChevronLeft } from 'lucide-react-native';
import { View, Pressable, ScrollView } from 'react-native';
import { Text, Card, Icon, Button } from 'src/components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOfferings, usePurchase, useRestorePurchase } from 'src/hooks/queries/billing';
import { Stack, useRouter } from 'expo-router';

const StyledSafeAreaView = withUniwind(SafeAreaView);

function FeatureItem({ title, description }: { title: string; description: string }) {
    return (
        <View className="flex-row items-center justify-between">
            <View>
                <Text className="text-sm font-medium text-gray-900">{title}</Text>
                <Text className="text-xs text-gray-400 mt-1">{description}</Text>
            </View>

            <View className="w-6 h-6 rounded-full bg-indigo-100 items-center justify-center">
                <Check size={14} color="#6366f1" />
            </View>
        </View>
    );
}

export default function PaywallScreen() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

    const { data: productList } = useOfferings();
    const purchaseMutation = usePurchase();
    const restorePurchaseMutation = useRestorePurchase();

    useEffect(() => {
        if (productList?.length) {
            setSelectedPlan(productList[0].id);
        }
    }, [productList]);

    const handlePurchase = () => {
        if (selectedPlan) {
            purchaseMutation.mutate(selectedPlan);
        }
    };

    const handleRestorePurchase = () => {
        if (selectedPlan) {
            restorePurchaseMutation.mutate();
        }
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-muted px-5">
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerLeft: ({ canGoBack }) =>
                        canGoBack && (
                            <Button variant="ghost" size="icon" onPress={() => router.back()} className="rounded-full">
                                <ChevronLeft className="text-foreground" />
                            </Button>
                        ),
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTitle: ''
                }}
            />
            <ScrollView className="flex-1 pt-10 bg-muted" showsVerticalScrollIndicator={false}>
                <View className="items-center mb-8">
                    <Icon as={Crown} size={48} color="#111827" className="mb-3" />
                    <Text className="text-2xl font-semibold text-gray-900">Pro</Text>
                    <Text className="text-sm text-gray-500 mt-1">Upgrade to unlock all features</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="mb-8 gap-4">
                    {productList?.map(({ id, title, price }) => {
                        const selected = selectedPlan === id;
                        return (
                            <Pressable
                                key={id}
                                onPress={() => setSelectedPlan(id)}
                                className={cn(
                                    'w-32 rounded-2xl px-3 py-4 items-center',
                                    selected ? 'bg-black' : 'bg-white border border-gray-200'
                                )}
                            >
                                <Text className={cn('text-sm font-medium', selected ? 'text-white' : 'text-gray-800')}>
                                    {title}
                                </Text>

                                <Text
                                    className={cn(
                                        'text-xl font-semibold mt-2',
                                        selected ? 'text-white' : 'text-gray-900'
                                    )}
                                >
                                    {price}
                                </Text>

                                <Text
                                    className={cn(
                                        'text-xs text-center mt-2',
                                        selected ? 'text-gray-300' : 'text-gray-400'
                                    )}
                                >
                                    One-time purchase
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
                <View className="mb-10">
                    <Text className="text-center text-sm text-gray-500 mb-4">Unlock Premium Features</Text>
                    <Card className="p-5 space-y-5">
                        <FeatureItem title="Unlimited Tasks" description="Create unlimited tasks" />
                        <FeatureItem title="Sync Reminders" description="Sync with system reminders" />
                        <FeatureItem title="Sync Calendar" description="Sync with system calendar" />
                        <FeatureItem title="Sync Calendar" description="Sync with system calendar" />
                    </Card>
                </View>
            </ScrollView>
            <View>
                <Button className="h-auto bg-black py-4 rounded-2xl" onPress={handlePurchase}>
                    <Text className="text-white font-semibold text-base">
                        Unlock Now - {productList?.find(i => i.id === selectedPlan)?.price}
                    </Text>
                </Button>
                <Button variant="link" size="sm" className="mt-2 items-center h-auto" onPress={handleRestorePurchase}>
                    <Text className="text-sm text-secondary-foreground">Restore Purchase</Text>
                </Button>
            </View>
        </StyledSafeAreaView>
    );
}
