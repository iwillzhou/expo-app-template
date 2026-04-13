import { useCSSVariable } from 'uniwind';
import { DynamicColorIOS } from 'react-native';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export function NativeTabsLayout({ tabs }: { tabs: any[] }) {
    const [primaryColor] = useCSSVariable(['--color-primary']);

    const colors = {
        active: primaryColor as string,
        inactive: DynamicColorIOS({
            light: '#000',
            dark: '#fff'
        })
    };
    return (
        <NativeTabs
            iconColor={{
                default: 'purple',
                selected: colors.active
            }}
            labelStyle={{
                default: { color: colors.inactive },
                selected: { color: colors.active }
            }}
        >
            {tabs.map(tab => (
                <NativeTabs.Trigger key={tab.name} name={tab.name}>
                    <NativeTabs.Trigger.Icon {...tab.icon.ios} />
                    <NativeTabs.Trigger.Label>{tab.title}</NativeTabs.Trigger.Label>
                </NativeTabs.Trigger>
            ))}
        </NativeTabs>
    );
}
