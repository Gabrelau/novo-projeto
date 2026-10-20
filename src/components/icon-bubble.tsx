import type { Icon } from '@/components/icons';
import { View } from 'react-native';

import { toneClasses, toneColor, type Tone } from '@/components/tone';
import { useTheme } from '@/hooks/use-theme';

type IconBubbleProps = {
  icon: Icon;
  tone?: Tone;
  size?: number;
};

/** Ícone dentro de um quadrado arredondado colorido. */
export function IconBubble({ icon: BubbleIcon, tone = 'primary', size = 38 }: IconBubbleProps) {
  const { colors } = useTheme();
  return (
    <View
      className={`items-center justify-center rounded-2xl ${toneClasses[tone].bg}`}
      style={{ width: size, height: size }}>
      <BubbleIcon size={size * 0.55} weight="duotone" color={colors[toneColor[tone]]} />
    </View>
  );
}
