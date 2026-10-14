import { BowlFoodIcon, CheckIcon, PillIcon, SignInIcon, SignOutIcon, type Icon } from '@/components/icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { IconBubble } from '@/components/icon-bubble';
import { Cat } from '@/components/illustrations/cat';
import { Dog } from '@/components/illustrations/dog';
import { PetAvatar } from '@/components/pet-avatar';
import { Screen } from '@/components/screen';
import { Tag } from '@/components/tag';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { brl, CAPACIDADE, cobrancasPendentes, hoje, petPorId } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

function saudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia!';
  if (hora < 18) return 'Boa tarde!';
  return 'Boa noite!';
}

function dataPorExtenso() {
  const texto = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function HojeScreen() {
  const { colors } = useTheme();
  const [feitas, setFeitas] = useState(() => new Set(hoje.tarefas.filter((t) => t.feita).map((t) => t.id)));

  const ocupadas = hoje.hospedados.length + hoje.entradas.length;
  const pagamentosHoje = cobrancasPendentes.filter((c) => c.vencimento === 'Hoje');

  const alternar = (id: string) =>
    setFeitas((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(id)) proximo.delete(id);
      else proximo.add(id);
      return proximo;
    });

  return (
    <Screen title={saudacao()} subtitle={dataPorExtenso()}>
      <Card className="flex-row items-end overflow-hidden rounded-3xl border-0 bg-accent">
        <View className="flex-1 gap-1 pb-1">
          <Text className="font-nunito-extrabold text-xs tracking-wider text-primary">HOSPEDAGEM HOJE</Text>
          <Heading size="3xl" className="font-heading font-normal">
            {ocupadas} de {CAPACIDADE}
          </Heading>
          <Text className="text-muted-foreground">vagas ocupadas</Text>
          <Progress value={(ocupadas / CAPACIDADE) * 100} className="mt-1 h-2.5 bg-card">
            <ProgressFilledTrack className="rounded-full" />
          </Progress>
        </View>
        <View className="-mb-4 -mr-2 flex-row items-end">
          <View className="z-10 -mr-6">
            <Cat size={64} coat="laranja" happy />
          </View>
          <Dog size={92} coat="caramelo" />
        </View>
      </Card>

      <View className="flex-row flex-wrap gap-4">
        <MovementCard
          title="Entradas"
          icon={SignInIcon}
          tone="mint"
          items={hoje.entradas.map((e) => ({
            petId: e.petId,
            horario: e.horario,
            nota: e.sinalPago ? 'Sinal pago' : 'Sinal pendente',
            alerta: !e.sinalPago,
          }))}
        />
        <MovementCard
          title="Saídas"
          icon={SignOutIcon}
          tone="lilac"
          items={hoje.saidas.map((s) => ({
            petId: s.petId,
            horario: s.horario,
            nota: `${s.pertences} pertences`,
            alerta: false,
          }))}
        />
      </View>

      <Card className="gap-3 rounded-3xl">
        <View className="flex-row items-center justify-between">
          <Heading size="md" className="font-nunito-bold font-normal">
            Rotina do dia
          </Heading>
          <Text size="sm" className="text-muted-foreground">
            {feitas.size} de {hoje.tarefas.length} feitas
          </Text>
        </View>
        {hoje.tarefas.map((tarefa) => {
          const feita = feitas.has(tarefa.id);
          const remedio = tarefa.tipo === 'remedio';
          return (
            <Pressable
              key={tarefa.id}
              onPress={() => alternar(tarefa.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: feita }}
              className="flex-row items-center gap-3">
              <View
                className={`h-7 w-7 items-center justify-center rounded-lg border-2 ${
                  feita ? 'border-mint bg-mint' : 'border-border'
                }`}>
                {feita && <CheckIcon size={16} weight="bold" color={colors.surface} />}
              </View>
              <IconBubble icon={remedio ? PillIcon : BowlFoodIcon} tone={remedio ? 'lilac' : 'sun'} size={36} />
              <View className="flex-1">
                <Text className={`font-nunito-bold ${feita ? 'text-muted-foreground line-through' : ''}`}>
                  {tarefa.titulo}
                </Text>
                <Text size="sm" className="text-muted-foreground">
                  {tarefa.horario} · {tarefa.detalhe}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </Card>

      <Card className="gap-3 rounded-3xl">
        <View className="flex-row items-center justify-between">
          <Heading size="md" className="font-nunito-bold font-normal">
            Pagamentos de hoje
          </Heading>
          <Tag label={brl(pagamentosHoje.reduce((soma, c) => soma + c.valor, 0))} tone="sun" />
        </View>
        {pagamentosHoje.map((cobranca) => (
          <View key={cobranca.id} className="flex-row items-center gap-3">
            <View className="flex-1">
              <Text className="font-nunito-bold">{cobranca.descricao}</Text>
              <Text size="sm" className="text-muted-foreground">
                {cobranca.tutor}
              </Text>
            </View>
            <Text className="font-nunito-bold">{brl(cobranca.valor)}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

type MovementCardProps = {
  title: string;
  icon: Icon;
  tone: 'mint' | 'lilac';
  items: { petId: string; horario: string; nota: string; alerta: boolean }[];
};

function MovementCard({ title, icon, tone, items }: MovementCardProps) {
  return (
    <Card className="min-w-[260px] flex-1 gap-3 rounded-3xl">
      <View className="flex-row items-center gap-2">
        <IconBubble icon={icon} tone={tone} size={36} />
        <Heading size="md" className="font-nunito-bold font-normal">
          {title}
        </Heading>
      </View>
      {items.map((item) => {
        const { pet } = petPorId(item.petId);
        return (
          <View key={item.petId} className="flex-row items-center gap-3">
            <PetAvatar look={pet.look} size={44} />
            <View className="flex-1">
              <Text className="font-nunito-bold">{pet.nome}</Text>
              <Text size="sm" className="text-muted-foreground">
                {item.horario}
              </Text>
            </View>
            <Tag label={item.nota} tone={item.alerta ? 'danger' : 'neutral'} />
          </View>
        );
      })}
    </Card>
  );
}
