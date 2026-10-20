import type { ComponentProps } from 'react';
import { View } from 'react-native';

import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

type TextFieldProps = ComponentProps<typeof InputField> & {
  label: string;
  /** Mensagem em vermelho embaixo do campo. */
  error?: string | null;
  inputClassName?: string;
};

/** Campo de texto com rótulo e mensagem de erro. */
export function TextField({ label, error, inputClassName, editable = true, ...props }: TextFieldProps) {
  return (
    <View className="gap-1.5">
      <Text size="sm" className="font-nunito-bold text-foreground">
        {label}
      </Text>
      <Input isInvalid={!!error} isDisabled={!editable} className="h-12 rounded-2xl bg-card px-4">
        <InputField
          editable={editable}
          className={`font-nunito text-base ${inputClassName ?? ''}`}
          accessibilityLabel={label}
          {...props}
        />
      </Input>
      {error && (
        <Text size="sm" className="font-nunito-semibold text-destructive">
          {error}
        </Text>
      )}
    </View>
  );
}
