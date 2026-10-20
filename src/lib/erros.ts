import { isAuthError } from '@supabase/supabase-js';

/** Traduz os erros do Supabase Auth mais comuns no login por código. */
export function mensagemDeErro(erro: unknown): string {
  if (isAuthError(erro)) {
    switch (erro.code) {
      case 'otp_expired':
        return 'Código errado ou vencido. Confira o último e-mail ou peça outro código.';
      case 'over_email_send_rate_limit':
      case 'over_request_rate_limit':
        return 'Muitos pedidos seguidos. Espere um pouco e tente de novo.';
      case 'email_address_invalid':
        return 'Esse e-mail não parece válido.';
      case 'email_address_not_authorized':
        return 'O envio de e-mails do Supabase ainda não foi configurado para esse endereço.';
      case 'otp_disabled':
      case 'signup_disabled':
        return 'O login por e-mail está desligado no Supabase.';
    }
    if (erro.status === 0 || erro.name === 'AuthRetryableFetchError') {
      return 'Sem conexão com a internet. Tente de novo.';
    }
    return erro.message;
  }
  if (erro instanceof Error) {
    return erro.message;
  }
  return 'Algo deu errado. Tente de novo.';
}
