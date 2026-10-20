import {
  BathtubIcon,
  BedIcon,
  CarIcon,
  CaretRightIcon,
  ClockIcon,
  DeviceMobileIcon,
  HouseLineIcon,
  MoonIcon,
  SignOutIcon,
  StarIcon,
  SunIcon,
  TennisBallIcon,
  UsersThreeIcon,
  type Icon,
} from '@/components/icons';
import { Pressable, View } from 'react-native';

import { IconBubble } from '@/components/icon-bubble';
import { Cat } from '@/components/illustrations/cat';
import { Dog } from '@/components/illustrations/dog';
import { Screen } from '@/components/screen';
import { Tag } from '@/components/tag';
import type { ThemePreference } from '@/components/theme-provider';
import type { Tone } from '@/components/tone';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { CAPACIDADE } from '@/data/mock';
import { useSession } from '@/hooks/use-session';
import { useTheme } from '@/hooks/use-theme';

const aparencias: { value: ThemePreference; label: string; icon: Icon }[] = [
  { value: 'system', label: 'Sistema', icon: DeviceMobileIcon },
  { value: 'light', label: 'Claro', icon: SunIcon },
  { value: 'dark', label: 'Escuro', icon: MoonIcon },
];

const servicos: { nome: string; modalidade: string; icon: Icon; tone: Tone }[] = [
  { nome: 'Hospedagem', modalidade: 'Estadia', icon: BedIcon, tone: 'primary' },
  { nome: 'Creche', modalidade: 'Diária', icon: HouseLineIcon, tone: 'mint' },
  { nome: 'Banho e tosa', modalidade: 'Sessão', icon: BathtubIcon, tone: 'lilac' },
  { nome: 'Adestramento', modalidade: 'Sessão', icon: TennisBallIcon, tone: 'sun' },
  { nome: 'Leva e traz', modalidade: 'Adicional', icon: CarIcon, tone: 'neutral' },
];

export default function AjustesScreen() {
  const { colors, preference, setPreference, scheme } = useTheme();
  const { session, negocio, sair } = useSession();

  return (
    <Screen title="Ajustes" subtitle={negocio?.nome ?? 'Seu negócio e o app'}>
      <Card className="gap-4 rounded-3xl">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Heading size="md" className="font-nunito-bold font-normal">
              Aparência
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              {scheme === 'dark' ? 'Modo escuro ativo' : 'Modo claro ativo'}
            </Text>
          </View>
          <View className="flex-row items-end">
            {scheme === 'dark' ? <Cat size={56} coat="preto" happy /> : <Dog size={56} coat="caramelo" />}
          </View>
        </View>
        <View className="flex-row gap-3">
          {aparencias.map(({ value, label, icon: OptionIcon }) => {
            const selecionado = preference === value;
            return (
              <Pressable
                key={value}
                onPress={() => setPreference(value)}
                accessibilityRole="radio"
                accessibilityState={{ selected: selecionado }}
                className={`flex-1 items-center gap-2 rounded-2xl border-2 py-4 ${
                  selecionado ? 'border-primary bg-accent' : 'border-border bg-muted'
                }`}>
                <OptionIcon
                  size={26}
                  weight={selecionado ? 'fill' : 'regular'}
                  color={selecionado ? colors.primary : colors.textSecondary}
                />
                <Text
                  size="sm"
                  className={selecionado ? 'font-nunito-bold text-foreground' : 'font-nunito-semibold text-muted-foreground'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card className="gap-1 rounded-3xl">
        <Heading size="md" className="mb-2 font-nunito-bold font-normal">
          Hospedagem
        </Heading>
        <Linha icon={UsersThreeIcon} tone="primary" titulo="Capacidade" valor={`${CAPACIDADE} cães`} />
        <Linha icon={ClockIcon} tone="lilac" titulo="Horário da diária" valor="12h às 12h" />
        <Linha icon={StarIcon} tone="sun" titulo="Alta temporada" valor="2 períodos" />
      </Card>

      <Card className="gap-1 rounded-3xl">
        <Heading size="md" className="mb-2 font-nunito-bold font-normal">
          Serviços
        </Heading>
        {servicos.map((servico) => (
          <Pressable key={servico.nome} className="flex-row items-center gap-3 py-2">
            <IconBubble icon={servico.icon} tone={servico.tone} size={36} />
            <Text className="flex-1 font-nunito-bold">{servico.nome}</Text>
            <Tag label={servico.modalidade} />
            <CaretRightIcon size={16} color={colors.textSecondary} />
          </Pressable>
        ))}
      </Card>

      <Card className="gap-1 rounded-3xl">
        <Heading size="md" className="mb-2 font-nunito-bold font-normal">
          Conta
        </Heading>
        <Text className="text-muted-foreground">{session?.user.email}</Text>
        <Pressable onPress={sair} accessibilityRole="button" className="mt-2 flex-row items-center gap-3 py-2">
          <IconBubble icon={SignOutIcon} tone="danger" size={36} />
          <Text className="flex-1 font-nunito-bold text-destructive">Sair</Text>
        </Pressable>
      </Card>

      <Text size="xs" className="text-center text-muted-foreground">
        Versão 1.0.0 · dados de exemplo
      </Text>
    </Screen>
  );
}

type LinhaProps = { icon: Icon; tone: Tone; titulo: string; valor: string };

function Linha({ icon, tone, titulo, valor }: LinhaProps) {
  const { colors } = useTheme();
  return (
    <Pressable className="flex-row items-center gap-3 py-2">
      <IconBubble icon={icon} tone={tone} size={36} />
      <Text className="flex-1 font-nunito-bold">{titulo}</Text>
      <Text className="text-muted-foreground">{valor}</Text>
      <CaretRightIcon size={16} color={colors.textSecondary} />
    </Pressable>
  );
}
