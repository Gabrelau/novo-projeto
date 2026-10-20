import '@/lib/local-storage';

import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

import type { Database } from '@/lib/database.types';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    'Faltam EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY no .env. Reinicie o Metro depois de criá-las.',
  );
}

// A web estática é renderizada no Node, onde não existe localStorage. Lá a
// sessão não é salva; no navegador e no celular, é.
const noServidor = Platform.OS === 'web' && typeof window === 'undefined';

export const supabase = createClient<Database>(url, publishableKey, {
  auth: {
    storage: noServidor ? undefined : localStorage,
    autoRefreshToken: !noServidor,
    persistSession: !noServidor,
    detectSessionInUrl: false,
  },
});

// No celular, o token só é renovado com o app aberto na tela.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
