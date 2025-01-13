import { cn } from 'src/utils';
import { remapProps } from 'nativewind';
import { TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { CodeField, useClearByFocusCell, CodeFieldProps, Cursor } from 'react-native-confirmation-code-field';
import { Text } from './text';

type OTPInputProps = Omit<CodeFieldProps, 'rootStyle' | 'onChange' | 'renderCell'> & {
    className?: string;
    cellClassName?: string;
    onChange?: CodeFieldProps['onChangeText'];
};

remapProps(CodeField, {
    className: 'rootStyle'
});

const InputOTP = React.forwardRef<React.ElementRef<typeof TextInput>, OTPInputProps>(
    ({ value, onChange, cellCount, className, cellClassName, defaultValue, ...props }, ref) => {
        const [internalValue, setInternalValue] = useState(defaultValue);
        const resolvedValue = value ?? internalValue;

        const onInternalValueChange = useCallback(
            (value: string) => {
                onChange?.(value);
                setInternalValue(value);
            },
            [onChange]
        );

        const [{ onPressOut }, getCellOnLayoutHandler] = useClearByFocusCell({
            value: resolvedValue,
            setValue: onInternalValueChange
        });

        return (
            <CodeField
                ref={ref}
                onPressOut={onPressOut}
                value={resolvedValue}
                onChangeText={onInternalValueChange}
                cellCount={cellCount}
                className={cn('grid gap-0.5', className)}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                {...props}
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        className={cn(
                            'size-14 flex items-center justify-center border border-input rounded-md bg-background',
                            isFocused && 'border-foreground',
                            cellClassName
                        )}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        <Text className="text-xl text-secondary-foreground">
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        );
    }
);

InputOTP.displayName = 'InputOTP';

export { InputOTP };
