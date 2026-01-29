import { cn } from 'src/utils/cn';
import { withUniwind } from 'uniwind';
import { TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { CodeField, useClearByFocusCell, CodeFieldProps, Cursor } from 'react-native-confirmation-code-field';
import { Text } from './text';

type OTPInputProps = Omit<CodeFieldProps, 'rootStyle' | 'onChange' | 'renderCell'> & {
    className?: string;
    cellClassName?: string;
    onChange?: CodeFieldProps['onChangeText'];
};

const CustomizedCodeField = withUniwind(CodeField, {
    rootStyle: {
        fromClassName: 'className'
    }
});

function InputOTP({
    className,
    value,
    onChange,
    cellCount,
    cellClassName,
    defaultValue,
    ...props
}: OTPInputProps & React.RefAttributes<TextInput>) {
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
        <CustomizedCodeField
            onPressOut={onPressOut}
            value={resolvedValue}
            onChangeText={onInternalValueChange}
            cellCount={cellCount}
            className={cn('flex-row justify-between gap-1', className)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            {...props}
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    key={index}
                    className={cn(
                        'size-14 aspect-square flex shrink items-center justify-center border border-input rounded-md bg-background',
                        isFocused && 'border-primary',
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

export { InputOTP };
