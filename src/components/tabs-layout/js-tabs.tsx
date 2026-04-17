import { Tabs } from 'expo-router';
import { useCSSVariable } from 'uniwind';
import { Ionicons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export function JsTabsLayout({ tabs }: { tabs: any[] }) {
    const [secondaryColor, foregroundColor] = useCSSVariable(['--color-secondary', '--color-foreground']);
    const tabCount = tabs.length;

    return (
        <Tabs
            key={secondaryColor}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 21,
                    marginHorizontal: (5 - tabCount) * 20,
                    gap: 10,
                    // backgroundColor: '#FFFFFF', // 容器背景色（深色）
                    borderRadius: 40, // 整体圆角
                    height: 62, // 高度
                    borderTopWidth: 0, // 去掉顶部分割线
                    // 添加阴影让它更有浮动感
                    shadowColor: foregroundColor as string,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5, // Android 阴影
                    paddingHorizontal: 4,
                    paddingBottom: 0 // 因为是悬浮的，不需要默认的底padding
                },
                tabBarShowLabel: true, // 是否显示文字
                // tabBarActiveTintColor: primaryColor as string, // 选中时的图标和文字颜色
                // tabBarInactiveTintColor: '#8E8E93',
                tabBarActiveBackgroundColor: secondaryColor as string,
                tabBarButton: (props: BottomTabBarButtonProps) => (
                    <PlatformPressable {...props} style={[props.style, { borderRadius: 30, padding: 6 }]} />
                ),
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }}
        >
            {tabs.map(tab => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? tab.icon.android : `${tab.icon.android}-outline`}
                                size={24}
                                color={color}
                            />
                        )
                    }}
                />
            ))}
        </Tabs>
    );
}
