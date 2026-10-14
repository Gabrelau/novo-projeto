import { CaretRightIcon, MagnifyingGlassIcon, PlusIcon, StarIcon, WhatsappLogoIcon } from '@/components/icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Cat } from '@/components/illustrations/cat';
import { PetAvatar } from '@/components/pet-avatar';
import { Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { Tag } from '@/components/tag';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { tutores } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

type Filtro = 'todos' | 'ativos' | 'especiais';

export default function ClientesScreen() {
  const { colors } = useTheme();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const termo = busca.trim().toLowerCase();
  const lista = tutores.filter((tutor) => {
    if (filtro === 'ativos' && !tutor.ativo) return false;
    if (filtro === 'especiais' && !tutor.pets.some((p) => p.especial)) return false;
    if (!termo) return true;
    return (
      tutor.nome.toLowerCase().includes(termo) || tutor.pets.some((p) => p.nome.toLowerCase().includes(termo))
    );
  });
  const totalPets = tutores.reduce((soma, t) => soma + t.pets.length, 0);

  return (
    <Screen
      title="Clientes"
      subtitle={`${tutores.length} famílias · ${totalPets} pets`}
      aside={
        <Button className="rounded-full" onPress={() => {}}>
          <PlusIcon size={16} weight="bold" color={colors.onPrimary} />
          <ButtonText className="font-nunito-bold">Novo</ButtonText>
        </Button>
      }>
      <Input className="h-12 rounded-full bg-card px-4">
        <InputSlot>
          <MagnifyingGlassIcon size={18} color={colors.textSecondary} />
        </InputSlot>
        <InputField
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar tutor ou pet"
          className="font-nunito text-base"
        />
      </Input>

      <Segmented<Filtro>
        value={filtro}
        onChange={setFiltro}
        options={[
          { value: 'todos', label: 'Todos' },
          { value: 'ativos', label: 'Ativos' },
          { value: 'especiais', label: 'Especiais' },
        ]}
      />

      {lista.length === 0 && (
        <Card className="items-center gap-2 rounded-3xl py-8">
          <Cat size={110} coat="preto" />
          <Heading size="md" className="font-nunito-bold font-normal">
            Ninguém por aqui
          </Heading>
          <Text className="text-center text-muted-foreground">Nenhum tutor ou pet com esse nome.</Text>
        </Card>
      )}

      {lista.map((tutor) => (
        <Pressable key={tutor.id} onPress={() => {}}>
          <Card className="gap-3 rounded-3xl">
            <View className="flex-row items-center gap-3">
              <View className="flex-row">
                {tutor.pets.map((pet, i) => (
                  <View key={pet.id} className={i > 0 ? '-ml-4 rounded-full border-2 border-card' : ''}>
                    <PetAvatar look={pet.look} size={52} />
                  </View>
                ))}
              </View>
              <View className="flex-1">
                <Text className="font-nunito-extrabold text-lg">{tutor.pets.map((p) => p.nome).join(' e ')}</Text>
                <Text size="sm" className="text-muted-foreground">
                  {tutor.nome}
                </Text>
              </View>
              <CaretRightIcon size={18} color={colors.textSecondary} />
            </View>
            <View className="flex-row flex-wrap items-center gap-2">
              {tutor.pets.map((pet) => (
                <Tag key={pet.id} label={`${pet.raca} · ${pet.porte}`} />
              ))}
              {tutor.pets
                .filter((p) => p.especial)
                .map((pet) => (
                  <Tag key={`${pet.id}-esp`} label={pet.especial!} tone="lilac" icon={StarIcon} />
                ))}
              {!tutor.ativo && <Tag label="Inativo" tone="danger" />}
            </View>
            <View className="flex-row items-center gap-2 border-t border-border pt-3">
              <WhatsappLogoIcon size={18} weight="duotone" color={colors.mint} />
              <Text size="sm" className="font-nunito-semibold text-muted-foreground">
                {tutor.telefone}
              </Text>
            </View>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
