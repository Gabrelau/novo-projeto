import Svg, { Ellipse, Path } from 'react-native-svg';

type PawProps = {
  size?: number;
  color: string;
  rotate?: number;
  opacity?: number;
};

/** Patinha usada como enfeite e no ícone da aba Clientes. */
export function Paw({ size = 24, color, rotate = 0, opacity = 1 }: PawProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" opacity={opacity} style={{ transform: [{ rotate: `${rotate}deg` }] }}>
      <Ellipse cx={5.2} cy={10.2} rx={2.1} ry={2.6} fill={color} transform="rotate(-20 5.2 10.2)" />
      <Ellipse cx={9.4} cy={5.8} rx={2.2} ry={2.8} fill={color} transform="rotate(-8 9.4 5.8)" />
      <Ellipse cx={14.6} cy={5.8} rx={2.2} ry={2.8} fill={color} transform="rotate(8 14.6 5.8)" />
      <Ellipse cx={18.8} cy={10.2} rx={2.1} ry={2.6} fill={color} transform="rotate(20 18.8 10.2)" />
      <Path
        d="M12 11 c-3.4 0 -6.6 3.6 -6.6 6.4 c0 2 1.6 3 3.4 3 c1.4 0 2.2 -0.7 3.2 -0.7 s1.8 0.7 3.2 0.7 c1.8 0 3.4 -1 3.4 -3 c0 -2.8 -3.2 -6.4 -6.6 -6.4 z"
        fill={color}
      />
    </Svg>
  );
}
