import type { Session } from '@supabase/supabase-js';
import { createContext, useCallback, useEffect, useState, type PropsWithChildren } from 'react';

import { supabase } from '@/lib/supabase';

export type NegocioAtual = { id: string; nome: string };

type SessionContextValue = {
  session: Session | null;
  /** Negócio de que o usuário é membro. null enquanto não houver um cadastrado. */
  negocio: NegocioAtual | null;
  /** true até saber se há sessão e, havendo, qual é o negócio. */
  carregando: boolean;
  /** Falha ao buscar o negócio (ex.: sem internet). Não dá para saber se ele existe. */
  erroNegocio: string | null;
  recarregarNegocio: () => Promise<void>;
  sair: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

// A RLS só devolve os negócios de que o usuário é membro.
const buscarNegocio = () =>
  supabase.from('negocios').select('id, nome').order('criado_em').limit(1).maybeSingle();

type ResultadoNegocio = Awaited<ReturnType<typeof buscarNegocio>>;

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessaoLida, setSessaoLida] = useState(false);
  const [negocio, setNegocio] = useState<NegocioAtual | null>(null);
  // Usuário para o qual negocio e erroNegocio foram buscados.
  const [negocioLidoPara, setNegocioLidoPara] = useState<string | null>(null);
  const [erroNegocio, setErroNegocio] = useState<string | null>(null);

  useEffect(() => {
    // Não chame o supabase dentro deste callback: ele roda com a trava da
    // sessão e a chamada ficaria esperando para sempre. O primeiro evento
    // (INITIAL_SESSION) traz a sessão salva no aparelho.
    const { data } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSession(novaSessao);
      setSessaoLida(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const usuarioId = session?.user.id;
  const negocioEmDia = !!usuarioId && negocioLidoPara === usuarioId;

  const guardarNegocio = useCallback((paraUsuario: string, { data, error }: ResultadoNegocio) => {
    if (error) {
      setErroNegocio(error.message);
    } else {
      setNegocio(data);
      setErroNegocio(null);
    }
    setNegocioLidoPara(paraUsuario);
  }, []);

  useEffect(() => {
    if (!usuarioId) return;
    // Se o usuário mudar antes da resposta, ela é descartada.
    let atual = true;
    buscarNegocio().then((resultado) => {
      if (atual) guardarNegocio(usuarioId, resultado);
    });
    return () => {
      atual = false;
    };
  }, [usuarioId, guardarNegocio]);

  const recarregarNegocio = useCallback(async () => {
    if (!usuarioId) return;
    guardarNegocio(usuarioId, await buscarNegocio());
  }, [usuarioId, guardarNegocio]);

  const sair = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        // Nunca expõe o negócio de quem estava logado antes.
        negocio: negocioEmDia ? negocio : null,
        carregando: !sessaoLida || (!!usuarioId && !negocioEmDia),
        erroNegocio: negocioEmDia ? erroNegocio : null,
        recarregarNegocio,
        sair,
      }}>
      {children}
    </SessionContext.Provider>
  );
}
