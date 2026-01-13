import { cn } from 'src/utils/cn';
import { View, TextInput } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Input, Button, Icon } from 'src/components/ui';
import { useState, type ComponentPropsWithoutRef } from 'react';

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
                <Icon as={secureTextEntry ? EyeOff : Eye} size={20} />
            </Button>
        </View>
    );
};
