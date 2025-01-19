import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from 'src/utils';
interface contextProps {
    textClass?: string;
    allowFontScaling?: boolean;
}

const TextContext = React.createContext<contextProps>({});

const Text = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
    const { textClass, allowFontScaling = true } = React.useContext(TextContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
        <Component
            className={cn('text-base text-foreground web:select-text', textClass, className)}
            ref={ref}
            allowFontScaling={allowFontScaling}
            {...props}
        />
    );
});
Text.displayName = 'Text';

export { Text, TextContext };
