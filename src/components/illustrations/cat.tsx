import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

const INK = '#3B2A20';
const BLUSH = '#FF9AA2';

export const CatCoats = {
  cinza: { fur: '#A7AEC0', stripe: '#7C8599', light: '#F2F3F7', inner: '#FFC2C8' },
  laranja: { fur: '#F4A259', stripe: '#D9772E', light: '#FFF3E6', inner: '#FFC2C8' },
  preto: { fur: '#4A4458', stripe: '#36313F', light: '#D9D3E3', inner: '#C98A9A' },
} as const;

export type CatCoat = keyof typeof CatCoats;

type CatProps = {
  size?: number;
  coat?: CatCoat;
  /** Olhos fechados, sorrindo. */
  happy?: boolean;
};

/** Gatinho sentado, de frente. */
export function Cat({ size = 120, coat = 'cinza', happy = false }: CatProps) {
  const c = CatCoats[coat];
  const eye = coat === 'preto' ? '#F4BF5C' : INK;

  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* rabo */}
      <Path d="M82 110 c20 2 26 -18 13 -28" stroke={c.fur} strokeWidth={8} strokeLinecap="round" fill="none" />
      {/* corpo */}
      <Ellipse cx={60} cy={95} rx={25} ry={21} fill={c.fur} />
      <Ellipse cx={60} cy={99} rx={12.5} ry={13} fill={c.light} />
      <Ellipse cx={50} cy={114} rx={8.5} ry={5} fill={c.fur} />
      <Ellipse cx={70} cy={114} rx={8.5} ry={5} fill={c.fur} />
      {/* orelhas */}
      <Path d="M33 48 L36 19 L56 35 Z" fill={c.fur} stroke={c.fur} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M87 48 L84 19 L64 35 Z" fill={c.fur} stroke={c.fur} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M38 40 L39.5 27 L50 35 Z" fill={c.inner} />
      <Path d="M82 40 L80.5 27 L70 35 Z" fill={c.inner} />
      {/* cabeça */}
      <Ellipse cx={60} cy={56} rx={30} ry={25} fill={c.fur} />
      <Path
        d="M60 33 v7 M52.5 34.5 l2 5.5 M67.5 34.5 l-2 5.5"
        stroke={c.stripe}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <Ellipse cx={60} cy={66} rx={11} ry={7.5} fill={c.light} />
      {/* olhos */}
      {happy ? (
        <Path
          d="M43 56 q4.5 -5 9 0 M68 56 q4.5 -5 9 0"
          stroke={INK}
          strokeWidth={2.4}
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <>
          <Ellipse cx={47.5} cy={55} rx={4} ry={4.6} fill={eye} />
          <Ellipse cx={72.5} cy={55} rx={4} ry={4.6} fill={eye} />
          <Circle cx={48.9} cy={53.4} r={1.5} fill="#FFFFFF" />
          <Circle cx={73.9} cy={53.4} r={1.5} fill="#FFFFFF" />
        </>
      )}
      {/* nariz e boca */}
      <Path d="M56.8 62.5 h6.4 l-3.2 3.4 z" fill="#FF8E9A" stroke="#FF8E9A" strokeWidth={1} strokeLinejoin="round" />
      <Path
        d="M60 66 q-2.8 3.4 -6 1.4 M60 66 q2.8 3.4 6 1.4"
        stroke={INK}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
      {/* bigodes */}
      <Path
        d="M41 63 l-13 -2 M41 67 l-13 2 M79 63 l13 -2 M79 67 l13 2"
        stroke={coat === 'preto' ? '#D9D3E3' : INK}
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.55}
      />
      <Ellipse cx={40} cy={61} rx={4.5} ry={2.8} fill={BLUSH} opacity={0.6} />
      <Ellipse cx={80} cy={61} rx={4.5} ry={2.8} fill={BLUSH} opacity={0.6} />
    </Svg>
  );
}
