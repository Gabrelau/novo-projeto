import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { AuthScreen } from '@/components/auth-screen';
import { BedIcon, HouseLineIcon, TennisBallIcon, type Icon } from '@/components/icons';
import { Dog } from '@/components/illustrations/dog';
import { TextField } from '@/components/text-field';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSession } from '@/hooks/use-session';
import { useTheme } from '@/hooks/use-theme';
import type { Enums } from '@/lib/database.types';
import { mensagemDeErro } from '@/lib/erros';
import { supabase } from '@/lib/supabase';

type Modalidade = Enums<'modalidade'>;

const opcoes: { value: Modalidade; label: string; detalhe: string; icon: Icon }[] = [
  { value: 'estadia', label: 'Hospedagem', detalhe: 'O cão dorme aí', icon: BedIcon },
  { value: 'diaria', label: 'Creche', detalhe: 'Passa o dia', icon: HouseLineIcon },
  { value: 'sessao', label: 'Sessões', detalhe: 'Passeio, adestramento, banho', icon: TennisBallIcon },
];

export default function NovoNegocioScreen() {
  const { colors } = useTheme();
  const { session, recarregarNegocio, sair } = useSession();
  const [nome, setNome] = useState('');
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);
  const [capacidade, setCapacidade] = useState('10');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [erroNome, setErroNome] = useState<string | null>(null);

  const temVagas = modalidades.includes('estadia') || modalidades.includes('diaria');

  const alternar = (modalidade: Modalidade) =>
    setModalidades((atual) =>
      atual.includes(modalidade) ? atual.filter((m) => m !== modalidade) : [...atual, modalidade],
    );

  const salvar = async () => {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) {
      setErroNome('Dê um nome ao seu negócio.');
      return;
    }
    const vagas = Number.parseInt(capacidade, 10);
    if (temVagas && !(vagas > 0)) {
      setErro('Informe quantos cães cabem ao mesmo tempo.');
      return;
    }
    setSalvando(true);
    setErro(null);
    setErroNome(null);
    const { error } = await supabase.rpc('criar_negocio', {
      nome: nomeLimpo,
      modalidades,
      ...(temVagas ? { capacidade: vagas } : {}),
    });
    if (error) {
      setSalvando(false);
      setErro(mensagemDeErro(error));
      return;
    }
    // Com o negócio carregado, o layout raiz leva para as abas.
    await recarregarNegocio();
  };

  return (
    <AuthScreen
      title="Vamos montar seu espaço"
      subtitle="Você pode mudar tudo isso depois em Ajustes."
      illustration={<Dog size={104} coat="creme" spot />}>
      <View className="gap-5">
        <TextField
          label="Nome do negócio"
          value={nome}
          onChangeText={setNome}
          placeholder="Ex.: Hotelzinho da Ana"
          autoCapitalize="words"
          editable={!salvando}
          error={erroNome}
        />

        <View className="gap-2">
          <Text size="sm" className="font-nunito-bold text-foreground">
            O que você oferece?
          </Text>
          {opcoes.map(({ value, label, detalhe, icon: OpcaoIcon }) => {
            const marcado = modalidades.includes(value);
            return (
              <Pressable
                key={value}
                onPress={() => alternar(value)}
                disabled={salvando}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: marcado }}
                className={`flex-row items-center gap-3 rounded-2xl border-2 px-4 py-3 ${
                  marcado ? 'border-primary bg-accent' : 'border-border bg-card'
                }`}>
                <OpcaoIcon
                  size={24}
                  weight={marcado ? 'fill' : 'regular'}
                  color={marcado ? colors.primary : colors.textSecondary}
                />
                <View className="flex-1">
                  <Text className="font-nunito-bold text-foreground">{label}</Text>
                  <Text size="sm" className="text-muted-foreground">
                    {detalhe}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {temVagas && (
          <TextField
            label="Quantos cães cabem ao mesmo tempo?"
            value={capacidade}
            onChangeText={(texto) => setCapacidade(texto.replace(/\D/g, ''))}
            keyboardType="number-pad"
            maxLength={3}
            editable={!salvando}
          />
        )}

        {erro && (
          <Text size="sm" className="font-nunito-semibold text-destructive">
            {erro}
          </Text>
        )}

        <Button size="lg" className="h-12 rounded-2xl" onPress={salvar} isDisabled={salvando}>
          {salvando && <ButtonSpinner color={colors.onPrimary} />}
          <ButtonText className="font-nunito-bold text-base">Começar</ButtonText>
        </Button>

        <Pressable onPress={sair} disabled={salvando} hitSlop={8} accessibilityRole="button" className="self-center">
          <Text size="sm" className="text-muted-foreground">
            Entrou como {session?.user.email}.{' '}
            <Text size="sm" className="font-nunito-bold text-primary">
              Trocar de conta
            </Text>
          </Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}
