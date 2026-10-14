import { Platform } from 'react-native';

/** Espelho da paleta de src/global.css, para os desenhos SVG e a barra de abas. */
export const Colors = {
  light: {
    background: '#FFF8F1',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF0E3',
    border: '#F1E2D3',
    text: '#3B2A20',
    textSecondary: '#8A7262',
    primary: '#EE7F3B',
    primarySoft: '#FFE3D0',
    onPrimary: '#FFFFFF',
    mint: '#2F9E7E',
    mintSoft: '#DDF4EC',
    lilac: '#7A68D6',
    lilacSoft: '#ECE8FF',
    sun: '#C98A12',
    sunSoft: '#FFF1D6',
    danger: '#D9505A',
    dangerSoft: '#FDE3E5',
    tabBar: '#FFFFFF',
    decoration: '#F6DCC6',
  },
  dark: {
    background: '#1C1714',
    surface: '#27201B',
    surfaceAlt: '#30271F',
    border: '#3D3129',
    text: '#F6EBE1',
    textSecondary: '#B8A595',
    primary: '#FF9F63',
    primarySoft: '#4A2E1E',
    onPrimary: '#2A1608',
    mint: '#5FD0AE',
    mintSoft: '#1F3A32',
    lilac: '#A898FF',
    lilacSoft: '#2E2846',
    sun: '#F4BF5C',
    sunSoft: '#3F321A',
    danger: '#F07A82',
    dangerSoft: '#45242A',
    tabBar: '#231C18',
    decoration: '#3A2E26',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = { [K in keyof typeof Colors.light]: string };
export type ThemeColor = keyof ThemeColors;

/** Nunito, carregada em `src/app/_layout.tsx`. */
export const Fonts = {
  regular: 'Nunito_400Regular',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
  mono: Platform.select({ web: 'ui-monospace, Consolas, monospace', default: 'monospace' }),
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 24,
  six: 32,
  seven: 48,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const MaxContentWidth = 720;
