/**
 * Dados de exemplo para montar o layout antes do Supabase.
 * Serão trocados pelas consultas reais quando o backend existir.
 */
import type { PetLook } from '@/components/pet-avatar';

export const CAPACIDADE = 10;

export type Pet = {
  id: string;
  nome: string;
  raca: string;
  porte: 'Pequeno' | 'Médio' | 'Grande';
  look: PetLook;
  especial?: string;
};

export type Tutor = {
  id: string;
  nome: string;
  telefone: string;
  pets: Pet[];
  ativo: boolean;
};

export const tutores: Tutor[] = [
  {
    id: 't1',
    nome: 'Ana Souza',
    telefone: '(61) 99812-4410',
    ativo: true,
    pets: [
      { id: 'p1', nome: 'Paçoca', raca: 'SRD', porte: 'Médio', look: { species: 'cao', coat: 'caramelo' } },
      { id: 'p2', nome: 'Bolinha', raca: 'Poodle', porte: 'Pequeno', look: { species: 'cao', coat: 'creme' } },
    ],
  },
  {
    id: 't2',
    nome: 'Carlos Lima',
    telefone: '(61) 98455-0921',
    ativo: true,
    pets: [
      {
        id: 'p3',
        nome: 'Thor',
        raca: 'Labrador',
        porte: 'Grande',
        look: { species: 'cao', coat: 'preto' },
        especial: 'Remédio 2x ao dia',
      },
    ],
  },
  {
    id: 't3',
    nome: 'Fernanda Rocha',
    telefone: '(61) 99120-3378',
    ativo: true,
    pets: [
      {
        id: 'p4',
        nome: 'Luna',
        raca: 'Border Collie',
        porte: 'Médio',
        look: { species: 'cao', coat: 'cinza', spot: true },
        especial: 'Ansiedade de separação',
      },
    ],
  },
  {
    id: 't4',
    nome: 'Juliana Mendes',
    telefone: '(61) 98101-7765',
    ativo: true,
    pets: [{ id: 'p5', nome: 'Mel', raca: 'Golden Retriever', porte: 'Grande', look: { species: 'cao', coat: 'creme' } }],
  },
  {
    id: 't5',
    nome: 'Patrícia Alves',
    telefone: '(61) 99677-2034',
    ativo: true,
    pets: [
      { id: 'p6', nome: 'Pipoca', raca: 'Beagle', porte: 'Médio', look: { species: 'cao', coat: 'caramelo', spot: true } },
      { id: 'p7', nome: 'Nina', raca: 'Shih-tzu', porte: 'Pequeno', look: { species: 'cao', coat: 'preto' } },
    ],
  },
  {
    id: 't6',
    nome: 'Rafael Costa',
    telefone: '(61) 98230-1189',
    ativo: false,
    pets: [{ id: 'p8', nome: 'Mingau', raca: 'SRD', porte: 'Pequeno', look: { species: 'gato', coat: 'cinza' } }],
  },
  {
    id: 't7',
    nome: 'Marcos Teixeira',
    telefone: '(61) 99345-6612',
    ativo: true,
    pets: [{ id: 'p9', nome: 'Bob', raca: 'Bulldog Francês', porte: 'Pequeno', look: { species: 'cao', coat: 'cinza' } }],
  },
  {
    id: 't8',
    nome: 'Lúcia Prado',
    telefone: '(61) 99502-8843',
    ativo: true,
    pets: [
      { id: 'p10', nome: 'Fred', raca: 'Dachshund', porte: 'Pequeno', look: { species: 'cao', coat: 'caramelo' } },
      { id: 'p11', nome: 'Kiara', raca: 'Pastor Alemão', porte: 'Grande', look: { species: 'cao', coat: 'preto', spot: true } },
    ],
  },
];

export function petPorId(id: string) {
  for (const tutor of tutores) {
    const pet = tutor.pets.find((p) => p.id === id);
    if (pet) return { pet, tutor };
  }
  throw new Error(`Pet ${id} não existe nos dados de exemplo`);
}

/** Movimento do dia na aba Hoje. */
export const hoje = {
  hospedados: ['p1', 'p2', 'p3', 'p5', 'p6', 'p7'],
  entradas: [{ petId: 'p4', horario: '14:00', pertences: 4, sinalPago: false }],
  saidas: [{ petId: 'p5', horario: '12:00', pertences: 3, restante: 210 }],
  tarefas: [
    { id: 'k1', horario: '08:00', tipo: 'refeicao' as const, titulo: 'Café da manhã', detalhe: 'Todos os hóspedes', feita: true },
    { id: 'k2', horario: '09:00', tipo: 'remedio' as const, titulo: 'Thor · Apoquel 16 mg', detalhe: '1 comprimido com comida', feita: true },
    { id: 'k3', horario: '12:00', tipo: 'refeicao' as const, titulo: 'Almoço da Bolinha', detalhe: 'Ração úmida, meia lata', feita: false },
    { id: 'k4', horario: '18:00', tipo: 'refeicao' as const, titulo: 'Jantar', detalhe: 'Todos os hóspedes', feita: false },
    { id: 'k5', horario: '21:00', tipo: 'remedio' as const, titulo: 'Thor · Apoquel 16 mg', detalhe: '1 comprimido com comida', feita: false },
  ],
};

export type Cobranca = {
  id: string;
  tutor: string;
  descricao: string;
  valor: number;
  vencimento: string;
  atrasada?: boolean;
};

export const cobrancasPendentes: Cobranca[] = [
  { id: 'c1', tutor: 'Juliana Mendes', descricao: 'Restante · Mel', valor: 210, vencimento: 'Hoje' },
  { id: 'c2', tutor: 'Fernanda Rocha', descricao: 'Sinal · Luna', valor: 175, vencimento: 'Hoje' },
  { id: 'c3', tutor: 'Marcos Teixeira', descricao: 'Creche · Bob', valor: 380, vencimento: 'Há 3 dias', atrasada: true },
  { id: 'c4', tutor: 'Carlos Lima', descricao: 'Restante · Thor', valor: 470, vencimento: 'Sexta' },
];

export const pagamentosRecentes = [
  { id: 'g1', tutor: 'Ana Souza', descricao: 'Sinal · Paçoca e Bolinha', valor: 250, forma: 'Pix', quando: 'Ontem' },
  { id: 'g2', tutor: 'Patrícia Alves', descricao: 'Hospedagem · Pipoca e Nina', valor: 600, forma: 'Pix', quando: 'Ontem' },
  { id: 'g3', tutor: 'Carlos Lima', descricao: 'Sinal · Thor', valor: 470, forma: 'Dinheiro', quando: 'Sábado' },
];

export const resumoMes = {
  recebido: 6840,
  aReceber: 1235,
  ocupacaoMedia: 0.68,
  porServico: [
    { servico: 'Hospedagem', valor: 5600 },
    { servico: 'Creche', valor: 820 },
    { servico: 'Banho e tosa', valor: 300 },
    { servico: 'Leva e traz', valor: 120 },
  ],
};

/** Ocupação de exemplo por dia do mês (índice 0 = dia 1). */
const ocupacaoBase = [4, 4, 5, 6, 6, 7, 7, 8, 10, 10, 10, 9, 6, 5, 6, 7, 7, 7, 8, 8, 6, 5, 5, 6, 7, 8, 9, 9, 8, 7, 6];

export function ocupacaoDoDia(dia: number) {
  return ocupacaoBase[(dia - 1) % ocupacaoBase.length];
}

/** Dias de alta temporada no mês de exemplo. */
export function eAltaTemporada(dia: number) {
  return dia >= 9 && dia <= 12;
}

/** Famílias hospedadas num dia, para a lista abaixo do calendário. */
const familiasPorOrdem = ['t1', 't2', 't5', 't4', 't3', 't7', 't8'];

export function familiasDoDia(dia: number) {
  const alvo = ocupacaoDoDia(dia);
  const resultado: { tutor: Tutor; pets: Pet[] }[] = [];
  let total = 0;
  for (const id of familiasPorOrdem) {
    if (total >= alvo) break;
    const tutor = tutores.find((t) => t.id === id)!;
    const pets = tutor.pets.slice(0, alvo - total);
    resultado.push({ tutor, pets });
    total += pets.length;
  }
  return { familias: resultado, total };
}

export const brl = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
