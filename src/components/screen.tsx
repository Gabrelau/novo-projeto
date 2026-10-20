import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

import { Paw } from '@/components/illustrations/paw';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  /** Elemento à direita do título, como um desenho ou um botão. */
  aside?: ReactNode;
}>;

/** Estrutura padrão das abas: cabeçalho com patinhas de enfeite e conteúdo com rolagem. */
export function Screen({ title, subtitle, aside, children }: ScreenProps) {
  const { colors } = useTheme();
  return (
    <View className="flex-1 bg-background pt-safe">
      <ScrollView contentContainerClassName="px-4 pb-12 pt-4" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[720px] gap-4 self-center">
          <View className="flex-row items-center gap-3">
            <View pointerEvents="none" className="absolute inset-0">
              <View className="absolute right-32 top-0">
                <Paw size={18} color={colors.decoration} rotate={-20} />
              </View>
              <View className="absolute right-40 top-9">
                <Paw size={14} color={colors.decoration} rotate={15} />
              </View>
            </View>
            <View className="flex-1 gap-0.5">
              <Heading size="3xl" className="font-heading font-normal">
                {title}
              </Heading>
              {subtitle && <Text className="text-muted-foreground">{subtitle}</Text>}
            </View>
            {aside}
          </View>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}
