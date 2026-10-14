import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

const INK = '#3B2A20';
const BLUSH = '#FF9AA2';

export const DogCoats = {
  caramelo: { fur: '#E8A86B', ear: '#B5713F', light: '#FFF1E2', collar: '#4FB89A' },
  creme: { fur: '#F3DDBF', ear: '#D2A877', light: '#FFF8EE', collar: '#EE7F3B' },
  cinza: { fur: '#C9C3BE', ear: '#857A71', light: '#F4F1EE', collar: '#7A68D6' },
  preto: { fur: '#5B4A42', ear: '#3A2E28', light: '#E9DCD0', collar: '#FF9AA2' },
} as const;

export type DogCoat = keyof typeof DogCoats;

type DogProps = {
  size?: number;
  coat?: DogCoat;
  /** Mancha em volta de um dos olhos. */
  spot?: boolean;
  /** Língua para fora. */
  tongue?: boolean;
};

/** Cachorro sentado, de frente. */
export function Dog({ size = 120, coat = 'caramelo', spot = false, tongue = true }: DogProps) {
  const c = DogCoats[coat];
  const pupil = coat === 'preto' ? '#1E1612' : INK;

  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* rabo */}
      <Path d="M86 96 q18 -4 17 -24" stroke={c.fur} strokeWidth={9} strokeLinecap="round" fill="none" />
      {/* corpo */}
      <Ellipse cx={60} cy={94} rx={29} ry={22} fill={c.fur} />
      <Ellipse cx={60} cy={99} rx={15} ry={13} fill={c.light} />
      <Ellipse cx={47} cy={113} rx={10} ry={6} fill={c.fur} />
      <Ellipse cx={73} cy={113} rx={10} ry={6} fill={c.fur} />
      <Path d="M44 113 v3 M50 113 v3 M70 113 v3 M76 113 v3" stroke={c.ear} strokeWidth={1.5} strokeLinecap="round" />
      {/* cabeça */}
      <Ellipse cx={60} cy={50} rx={32} ry={28} fill={c.fur} />
      {spot && <Ellipse cx={74} cy={46} rx={11} ry={10} fill={c.ear} opacity={0.75} />}
      {/* orelhas caídas */}
      <Ellipse cx={30} cy={50} rx={10} ry={19} fill={c.ear} transform="rotate(18 30 50)" />
      <Ellipse cx={90} cy={50} rx={10} ry={19} fill={c.ear} transform="rotate(-18 90 50)" />
      {/* focinho */}
      <Ellipse cx={60} cy={63} rx={15} ry={11} fill={c.light} />
      <Ellipse cx={60} cy={57.5} rx={5.5} ry={3.8} fill={INK} />
      <Ellipse cx={58.6} cy={56.4} rx={1.6} ry={1} fill="#FFFFFF" opacity={0.7} />
      {tongue && <Path d="M56.5 65.5 q3.5 7 7 0 z" fill="#FF7F8E" />}
      <Path
        d="M60 61.5 v3.2 M60 64.7 q-3.6 3.4 -7 1 M60 64.7 q3.6 3.4 7 1"
        stroke={INK}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      {/* olhos */}
      <G>
        <Circle cx={46} cy={48} r={4.2} fill={pupil} />
        <Circle cx={74} cy={48} r={4.2} fill={pupil} />
        <Circle cx={47.4} cy={46.6} r={1.5} fill="#FFFFFF" />
        <Circle cx={75.4} cy={46.6} r={1.5} fill="#FFFFFF" />
      </G>
      <Ellipse cx={38} cy={59} rx={5} ry={3} fill={BLUSH} opacity={0.6} />
      <Ellipse cx={82} cy={59} rx={5} ry={3} fill={BLUSH} opacity={0.6} />
      {/* coleira */}
      <Path d="M42 77 q18 8 36 0" stroke={c.collar} strokeWidth={5} strokeLinecap="round" fill="none" />
      <Circle cx={60} cy={84.5} r={3.6} fill="#F4BF5C" />
    </Svg>
  );
}
