import { useContext } from 'react';

import { SessionContext } from '@/components/session-provider';

/** Sessão do Supabase e negócio do usuário logado. */
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession precisa estar dentro de SessionProvider');
  }
  return context;
}
