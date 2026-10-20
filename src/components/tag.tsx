import type { Icon } from '@/components/icons';

import { toneClasses, toneColor, type Tone } from '@/components/tone';
import { Badge, BadgeText } from '@/components/ui/badge';
import { useTheme } from '@/hooks/use-theme';

type TagProps = {
  label: string;
  tone?: Tone;
  icon?: Icon;
};

/** Etiqueta arredondada em tom suave, como "Sinal pendente" ou "Alta temporada". */
export function Tag({ label, tone = 'neutral', icon: TagIcon }: TagProps) {
  const { colors } = useTheme();
  const { bg, text } = toneClasses[tone];
  return (
    <Badge variant="outline" className={`gap-1 self-start rounded-full border-0 px-2.5 py-1 ${bg}`}>
      {TagIcon && <TagIcon size={13} weight="bold" color={colors[toneColor[tone]]} />}
      <BadgeText className={`font-nunito-bold normal-case ${text}`}>{label}</BadgeText>
    </Badge>
  );
}
