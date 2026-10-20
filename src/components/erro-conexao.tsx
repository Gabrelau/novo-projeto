import { useState } from 'react';
import { View } from 'react-native';

import { AuthScreen } from '@/components/auth-screen';
import { Dog } from '@/components/illustrations/dog';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSession } from '@/hooks/use-session';
import { useTheme } from '@/hooks/use-theme';

/**
 * Aparece quando há sessão, mas o negócio não pôde ser buscado. Sem isso o app
 * mandaria a pessoa cadastrar um negócio que talvez já exista.
 */
export function ErroConexao() {
  const { colors } = useTheme();
  const { erroNegocio, recarregarNegocio, sair } = useSession();
  const [tentando, setTentando] = useState(false);

  const tentarDeNovo = async () => {
    setTentando(true);
    await recarregarNegocio();
    setTentando(false);
  };

  return (
    <AuthScreen
      title="Não conseguimos conectar"
      subtitle="Confira a internet e tente de novo."
      illustration={<Dog size={96} coat="cinza" tongue={false} />}>
      <View className="gap-3">
        {erroNegocio && (
          <Text size="xs" className="text-center text-muted-foreground">
            {erroNegocio}
          </Text>
        )}
        <Button size="lg" className="h-12 rounded-2xl" onPress={tentarDeNovo} isDisabled={tentando}>
          {tentando && <ButtonSpinner color={colors.onPrimary} />}
          <ButtonText className="font-nunito-bold text-base">Tentar de novo</ButtonText>
        </Button>
        <Button variant="ghost" className="h-12 rounded-2xl" onPress={sair} isDisabled={tentando}>
          <ButtonText className="font-nunito-bold text-base">Sair</ButtonText>
        </Button>
      </View>
    </AuthScreen>
  );
}
