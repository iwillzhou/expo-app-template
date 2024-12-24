import { cn } from 'src/utils';
import { View, TextInput } from 'react-native';
import { useState, type ComponentPropsWithoutRef } from 'react';
import { Input, Button } from './ui';
import { ViewOffSlashStroke, ViewStroke } from './icons';

export const PasswordInput = ({ className, ...props }: ComponentPropsWithoutRef<typeof TextInput>) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    return (
        <View className="h-16 relative">
            <Input
                className={cn('native:h-full pr-16', className)}
                secureTextEntry={secureTextEntry}
                autoCapitalize={'none'}
                {...props}
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
                {secureTextEntry ? <ViewOffSlashStroke /> : <ViewStroke />}
            </Button>
        </View>
    );
};
