import { Platform } from 'react-native';
import { NativeTabsLayout, JsTabsLayout } from 'src/components/tabs-layout';

const tabs = [
    {
        name: 'home',
        title: 'Home',
        icon: {
            ios: {
                sf: {
                    default: 'house',
                    selected: 'house.fill'
                }
            },
            android: 'home'
        }
    },
    {
        name: 'settings',
        title: 'Settings',
        icon: {
            ios: {
                sf: {
                    default: 'gear',
                    selected: 'gear.fill'
                }
            },
            android: 'settings'
        }
    },
    {
        name: 'profile',
        title: 'Profile',
        icon: {
            ios: {
                sf: {
                    default: 'person',
                    selected: 'person.fill'
                }
            },
            android: 'person'
        }
    }
];

export default function TabsLayout() {
    // if (Platform.OS === 'ios') {
    //     return <NativeTabsLayout tabs={tabs} />;
    // }

    return <JsTabsLayout tabs={tabs} />;
}
