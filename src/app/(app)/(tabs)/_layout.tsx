import { useTheme } from '@react-navigation/native';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
    const { colors } = useTheme();

    return (
        <NativeTabs
            backgroundColor="transparent"
            tintColor={colors.primary}
            iconColor={{ default: colors.text, selected: colors.primary }}
        >
            <NativeTabs.Trigger name="home">
                <NativeTabs.Trigger.Label>home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings">
                <NativeTabs.Trigger.Label>settings</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="gear" md="settings" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="person.fill" md="account_circle" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
