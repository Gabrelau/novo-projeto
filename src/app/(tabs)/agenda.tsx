import { CaretLeftIcon, CaretRightIcon, PlusIcon, StarIcon } from '@/components/icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { PetAvatar } from '@/components/pet-avatar';
import { Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { Tag } from '@/components/tag';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { CAPACIDADE, eAltaTemporada, familiasDoDia, ocupacaoDoDia } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

type Visao = 'mes' | 'semana' | 'dia';

const DIAS_DA_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function nivel(ocupadas: number) {
  if (ocupadas >= CAPACIDADE) return { bg: 'bg-destructive', soft: 'bg-destructive-soft', label: 'Lotado' };
  if (ocupadas / CAPACIDADE >= 0.8) return { bg: 'bg-sun', soft: 'bg-sun-soft', label: 'Quase cheio' };
  return { bg: 'bg-mint', soft: 'bg-mint-soft', label: 'Com vagas' };
}

export default function AgendaScreen() {
  const { colors } = useTheme();
  const hoje = new Date();
  const [visao, setVisao] = useState<Visao>('mes');
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());

  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
  const mesPorExtenso = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const nomeDoMes = mesPorExtenso.charAt(0).toUpperCase() + mesPorExtenso.slice(1);

  const celulas: (number | null)[] = [
    ...Array.from({ length: primeiroDiaDaSemana }, () => null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ];
  while (celulas.length % 7 !== 0) celulas.push(null);

  const inicioDaSemana = Math.max(1, diaSelecionado - new Date(ano, mes, diaSelecionado).getDay());
  const diasDaSemana = Array.from({ length: 7 }, (_, i) => inicioDaSemana + i).filter((d) => d <= diasNoMes);

  return (
    <Screen
      title="Agenda"
      subtitle="Hospedagens e vagas"
      aside={
        <Button className="rounded-full" onPress={() => {}}>
          <PlusIcon size={16} weight="bold" color={colors.onPrimary} />
          <ButtonText className="font-nunito-bold">Reserva</ButtonText>
        </Button>
      }>
      <Segmented<Visao>
        value={visao}
        onChange={setVisao}
        options={[
          { value: 'mes', label: 'Mês' },
          { value: 'semana', label: 'Semana' },
          { value: 'dia', label: 'Dia' },
        ]}
      />

      {visao === 'mes' && (
        <Card className="gap-3 rounded-3xl">
          <View className="flex-row items-center justify-between">
            <CaretLeftIcon size={20} color={colors.textSecondary} />
            <Heading size="md" className="font-nunito-bold font-normal">
              {nomeDoMes}
            </Heading>
            <CaretRightIcon size={20} color={colors.textSecondary} />
          </View>
          <View className="flex-row">
            {DIAS_DA_SEMANA.map((d, i) => (
              <Text key={i} size="xs" className="flex-1 text-center font-nunito-bold text-muted-foreground">
                {d}
              </Text>
            ))}
          </View>
          <View className="flex-row flex-wrap">
            {celulas.map((dia, i) => {
              if (dia === null) return <View key={`vazio-${i}`} className="aspect-square w-[14.28%]" />;
              const ocupadas = ocupacaoDoDia(dia);
              const selecionado = dia === diaSelecionado;
              const alta = eAltaTemporada(dia);
              return (
                <Pressable
                  key={dia}
                  onPress={() => setDiaSelecionado(dia)}
                  accessibilityLabel={`Dia ${dia}, ${ocupadas} de ${CAPACIDADE} vagas ocupadas`}
                  className="aspect-square w-[14.28%] p-0.5">
                  <View
                    className={`flex-1 items-center justify-center gap-1 rounded-2xl ${
                      selecionado ? 'bg-primary' : alta ? 'bg-sun-soft' : ''
                    }`}>
                    <Text
                      size="sm"
                      className={`font-nunito-bold ${selecionado ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {dia}
                    </Text>
                    <View className={`h-1.5 w-1.5 rounded-full ${nivel(ocupadas).bg}`} />
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View className="flex-row flex-wrap gap-x-4 gap-y-1">
            <Legenda className="bg-mint" texto="Com vagas" />
            <Legenda className="bg-sun" texto="Quase cheio" />
            <Legenda className="bg-destructive" texto="Lotado" />
            <View className="flex-row items-center gap-1.5">
              <View className="h-3 w-3 rounded bg-sun-soft" />
              <Text size="xs" className="text-muted-foreground">
                Alta temporada
              </Text>
            </View>
          </View>
        </Card>
      )}

      {visao === 'semana' && (
        <Card className="gap-3 rounded-3xl">
          {diasDaSemana.map((dia) => {
            const ocupadas = ocupacaoDoDia(dia);
            const data = new Date(ano, mes, dia);
            return (
              <Pressable key={dia} onPress={() => setDiaSelecionado(dia)} className="flex-row items-center gap-3">
                <View
                  className={`h-12 w-12 items-center justify-center rounded-2xl ${
                    dia === diaSelecionado ? 'bg-primary' : 'bg-muted'
                  }`}>
                  <Text
                    size="xs"
                    className={dia === diaSelecionado ? 'text-primary-foreground' : 'text-muted-foreground'}>
                    {data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                  </Text>
                  <Text
                    className={`font-nunito-extrabold ${
                      dia === diaSelecionado ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                    {dia}
                  </Text>
                </View>
                <View className="flex-1 gap-1.5">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-nunito-bold">
                      {ocupadas} de {CAPACIDADE} vagas
                    </Text>
                    {eAltaTemporada(dia) && <Tag label="Alta temporada" tone="sun" icon={StarIcon} />}
                  </View>
                  <Progress value={(ocupadas / CAPACIDADE) * 100} className={`h-2 ${nivel(ocupadas).soft}`}>
                    <ProgressFilledTrack className={`rounded-full ${nivel(ocupadas).bg}`} />
                  </Progress>
                </View>
              </Pressable>
            );
          })}
        </Card>
      )}

      <DiaSelecionado ano={ano} mes={mes} dia={diaSelecionado} />
    </Screen>
  );
}

function Legenda({ className, texto }: { className: string; texto: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <View className={`h-2 w-2 rounded-full ${className}`} />
      <Text size="xs" className="text-muted-foreground">
        {texto}
      </Text>
    </View>
  );
}

function DiaSelecionado({ ano, mes, dia }: { ano: number; mes: number; dia: number }) {
  const { familias } = familiasDoDia(dia);
  const ocupadas = ocupacaoDoDia(dia);
  const data = new Date(ano, mes, dia).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Card className="gap-3 rounded-3xl">
      <View className="gap-1">
        <Heading size="md" className="font-nunito-bold font-normal">
          {data.charAt(0).toUpperCase() + data.slice(1)}
        </Heading>
        <View className="flex-row flex-wrap gap-2">
          <Tag label={`${ocupadas} de ${CAPACIDADE} vagas`} tone={ocupadas >= CAPACIDADE ? 'danger' : 'mint'} />
          {eAltaTemporada(dia) && <Tag label="Alta temporada" tone="sun" icon={StarIcon} />}
          {ocupadas >= CAPACIDADE && <Tag label="Lista de espera: 2" tone="lilac" />}
        </View>
      </View>
      {familias.map(({ tutor, pets }) => (
        <View key={tutor.id} className="gap-2 rounded-2xl bg-muted p-3">
          <Text size="sm" className="font-nunito-bold text-muted-foreground">
            Família {tutor.nome.split(' ').at(-1)} · {pets.length} {pets.length === 1 ? 'pet' : 'pets'}
          </Text>
          {pets.map((pet) => (
            <View key={pet.id} className="flex-row items-center gap-3">
              <PetAvatar look={pet.look} size={40} />
              <View className="flex-1">
                <Text className="font-nunito-bold">{pet.nome}</Text>
                <Text size="sm" className="text-muted-foreground">
                  {pet.raca} · {pet.porte}
                </Text>
              </View>
              {pet.especial && <Tag label="Especial" tone="lilac" icon={StarIcon} />}
            </View>
          ))}
        </View>
      ))}
    </Card>
  );
}
