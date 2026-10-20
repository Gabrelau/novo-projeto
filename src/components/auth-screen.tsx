import type { PropsWithChildren, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Paw } from '@/components/illustrations/paw';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';

type AuthScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: ReactNode;
  /** Desenho acima do título. */
  illustration?: ReactNode;
}>;

/** Moldura das telas fora das abas (entrar, cadastrar o negócio): conteúdo centralizado e que sobe com o teclado. */
export function AuthScreen({ title, subtitle, illustration, children }: AuthScreenProps) {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="grow justify-center px-4 pb-safe-offset-6 pt-safe-offset-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[440px] gap-6 self-center">
          <View pointerEvents="none" className="absolute inset-0">
            <View className="absolute left-2 top-0">
              <Paw size={22} color={colors.decoration} rotate={-20} />
            </View>
            <View className="absolute right-6 top-10">
              <Paw size={16} color={colors.decoration} rotate={18} />
            </View>
          </View>
          {illustration && <View className="flex-row items-end justify-center">{illustration}</View>}
          <View className="gap-1">
            <Heading size="3xl" className="text-center font-heading font-normal">
              {title}
            </Heading>
            {subtitle && <Text className="text-center text-muted-foreground">{subtitle}</Text>}
          </View>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
