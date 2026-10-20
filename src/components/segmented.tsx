import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';

type SegmentedProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

/** Grupo de botões em que só um fica selecionado (ex.: Mês, Semana, Dia). */
export function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <View className="flex-row gap-1 rounded-full bg-muted p-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`flex-1 items-center rounded-full py-2 ${selected ? 'bg-card' : ''}`}>
            <Text
              size="sm"
              className={selected ? 'font-nunito-bold text-foreground' : 'font-nunito-semibold text-muted-foreground'}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
