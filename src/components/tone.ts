import type { ThemeColor } from '@/constants/theme';

/** Tons de destaque do app. Cada um tem um fundo suave e uma cor forte. */
export type Tone = 'primary' | 'mint' | 'lilac' | 'sun' | 'danger' | 'neutral';

export const toneClasses: Record<Tone, { bg: string; text: string }> = {
  primary: { bg: 'bg-accent', text: 'text-primary' },
  mint: { bg: 'bg-mint-soft', text: 'text-mint' },
  lilac: { bg: 'bg-lilac-soft', text: 'text-lilac' },
  sun: { bg: 'bg-sun-soft', text: 'text-sun' },
  danger: { bg: 'bg-destructive-soft', text: 'text-destructive' },
  neutral: { bg: 'bg-muted', text: 'text-muted-foreground' },
};

/** Cor forte do tom, para ícones e desenhos que recebem a cor por prop. */
export const toneColor: Record<Tone, ThemeColor> = {
  primary: 'primary',
  mint: 'mint',
  lilac: 'lilac',
  sun: 'sun',
  danger: 'danger',
  neutral: 'textSecondary',
};
