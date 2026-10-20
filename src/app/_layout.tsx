import '@/global.css';

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

import { ErroConexao } from '@/components/erro-conexao';
import { SessionProvider } from '@/components/session-provider';
import { AppThemeProvider } from '@/components/theme-provider';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useSession } from '@/hooks/use-session';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppThemeProvider>
          <SessionProvider>
            <AppShell />
          </SessionProvider>
        </AppThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaListener>
  );
}

function AppShell() {
  const { colors, scheme, preference } = useTheme();
  const { carregando } = useSession();
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // A abertura fica na tela até as fontes e a sessão estarem prontas.
  useEffect(() => {
    if (!carregando) {
      SplashScreen.hideAsync();
    }
  }, [carregando]);

  return (
    <GluestackUIProvider mode={preference}>
      <ThemeProvider
        value={{
          ...base,
          colors: {
            ...base.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.tabBar,
            text: colors.text,
            border: colors.border,
          },
        }}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        {carregando ? (
          // Entre o login e a busca do negócio. Trocar a pilha inteira evita
          // mostrar por um instante a tela de cadastro a quem já tem negócio.
          <View className="flex-1 items-center justify-center bg-background">
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <RootNavigator />
        )}
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

function RootNavigator() {
  const { session, negocio, erroNegocio } = useSession();
  const logado = !!session;

  if (logado && !negocio && erroNegocio) {
    return <ErroConexao />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={logado && !!negocio}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={logado && !negocio}>
        <Stack.Screen name="novo-negocio" />
      </Stack.Protected>
      <Stack.Protected guard={!logado}>
        <Stack.Screen name="entrar" />
      </Stack.Protected>
    </Stack>
  );
}
