import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AuthScreen } from '@/components/auth-screen';
import { Cat } from '@/components/illustrations/cat';
import { Dog } from '@/components/illustrations/dog';
import { TextField } from '@/components/text-field';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';
import { mensagemDeErro } from '@/lib/erros';
import { supabase } from '@/lib/supabase';

/** Tempo mínimo entre dois envios de código, igual ao limite padrão do Supabase. */
const ESPERA_REENVIO = 60;

const pareceEmail = (texto: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);

export default function EntrarScreen() {
  const { colors } = useTheme();
  const [etapa, setEtapa] = useState<'email' | 'codigo'>('email');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [espera, setEspera] = useState(0);

  useEffect(() => {
    if (espera <= 0) return;
    const timer = setTimeout(() => setEspera((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [espera]);

  const enviarCodigo = async () => {
    const endereco = email.trim().toLowerCase();
    if (!pareceEmail(endereco)) {
      setErro('Digite um e-mail válido.');
      return;
    }
    setEnviando(true);
    setErro(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: endereco,
      options: { shouldCreateUser: true },
    });
    setEnviando(false);
    if (error) {
      setErro(mensagemDeErro(error));
      return;
    }
    setEmail(endereco);
    setCodigo('');
    setEspera(ESPERA_REENVIO);
    setEtapa('codigo');
  };

  const confirmarCodigo = async () => {
    const token = codigo.replace(/\D/g, '');
    if (token.length < 6) {
      setErro('O código tem 6 números.');
      return;
    }
    setEnviando(true);
    setErro(null);
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
    // Com sucesso, a sessão muda e o layout raiz troca de tela sozinho.
    if (error) {
      setEnviando(false);
      setErro(mensagemDeErro(error));
    }
  };

  const trocarEmail = () => {
    setEtapa('email');
    setCodigo('');
    setErro(null);
  };

  if (etapa === 'codigo') {
    return (
      <AuthScreen
        title="Confira seu e-mail"
        subtitle={
          <>
            Enviamos um código para <Text className="font-nunito-bold text-foreground">{email}</Text>
          </>
        }
        illustration={<Cat size={96} coat="laranja" happy />}>
        <View className="gap-4">
          <TextField
            label="Código"
            value={codigo}
            onChangeText={(texto) => setCodigo(texto.replace(/\D/g, ''))}
            onSubmitEditing={confirmarCodigo}
            placeholder="000000"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            maxLength={10}
            autoFocus
            editable={!enviando}
            error={erro}
            inputClassName="text-center font-nunito-bold text-2xl tracking-[8px]"
          />
          <Button size="lg" className="h-12 rounded-2xl" onPress={confirmarCodigo} isDisabled={enviando}>
            {enviando && <ButtonSpinner color={colors.onPrimary} />}
            <ButtonText className="font-nunito-bold text-base">Entrar</ButtonText>
          </Button>
          <View className="flex-row justify-between">
            <Pressable onPress={trocarEmail} hitSlop={8} accessibilityRole="button">
              <Text className="font-nunito-bold text-primary">Trocar e-mail</Text>
            </Pressable>
            <Pressable
              onPress={enviarCodigo}
              disabled={espera > 0 || enviando}
              hitSlop={8}
              accessibilityRole="button">
              <Text className={`font-nunito-bold ${espera > 0 ? 'text-muted-foreground' : 'text-primary'}`}>
                {espera > 0 ? `Reenviar em ${espera}s` : 'Reenviar código'}
              </Text>
            </Pressable>
          </View>
        </View>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen
      title="Que bom ter você aqui!"
      subtitle="Entre com seu e-mail. Mandamos um código para você, sem senha para decorar."
      illustration={
        <>
          <View className="z-10 -mr-5">
            <Dog size={104} coat="caramelo" />
          </View>
          <Cat size={80} coat="cinza" happy />
        </>
      }>
      <View className="gap-4">
        <TextField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={enviarCodigo}
          placeholder="voce@exemplo.com"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!enviando}
          error={erro}
        />
        <Button size="lg" className="h-12 rounded-2xl" onPress={enviarCodigo} isDisabled={enviando}>
          {enviando && <ButtonSpinner color={colors.onPrimary} />}
          <ButtonText className="font-nunito-bold text-base">Receber código</ButtonText>
        </Button>
      </View>
    </AuthScreen>
  );
}
