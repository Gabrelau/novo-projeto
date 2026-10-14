import { useContext } from 'react';

import { ThemeContext } from '@/components/theme-provider';

/** Cores e preferência de tema (sistema, claro ou escuro) escolhida em Ajustes. */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme precisa estar dentro de AppThemeProvider');
  }
  return context;
}
