import { View } from 'react-native';

import { Cat, type CatCoat } from '@/components/illustrations/cat';
import { Dog, type DogCoat } from '@/components/illustrations/dog';

export type PetLook =
  | { species: 'cao'; coat: DogCoat; spot?: boolean }
  | { species: 'gato'; coat: CatCoat };

type PetAvatarProps = {
  look: PetLook;
  size?: number;
};

/** Desenho do pet dentro de um círculo, usado enquanto o cadastro não tem foto. */
export function PetAvatar({ look, size = 48 }: PetAvatarProps) {
  const drawing = size * 1.05;
  return (
    <View
      className="items-center justify-center overflow-hidden rounded-full bg-muted"
      style={{ width: size, height: size }}>
      <View style={{ marginTop: size * 0.18 }}>
        {look.species === 'cao' ? (
          <Dog size={drawing} coat={look.coat} spot={look.spot} tongue={false} />
        ) : (
          <Cat size={drawing} coat={look.coat} />
        )}
      </View>
    </View>
  );
}
