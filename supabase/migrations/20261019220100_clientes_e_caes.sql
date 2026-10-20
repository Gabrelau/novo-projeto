-- Tutores, cães e a ficha do cão (vacinas, anexos e medicação).
--
-- Padrão de todas as tabelas de dados:
-- * negocio_id em toda linha, para a regra de acesso ser uma só;
-- * unique (negocio_id, id) nas tabelas que são referenciadas, e chaves
--   estrangeiras compostas nas filhas, para que um registro nunca aponte
--   para dados de outro negócio.

create type public.especie as enum ('cao', 'gato');
create type public.porte as enum ('pequeno', 'medio', 'grande');
create type public.sexo as enum ('macho', 'femea');

create table public.tutores (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  nome text not null check (length(trim(nome)) > 0),
  telefone text,
  email text,
  endereco text,
  observacoes text,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id)
);

create table public.caes (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  nome text not null check (length(trim(nome)) > 0),
  especie public.especie not null default 'cao',
  raca text,
  porte public.porte,
  sexo public.sexo,
  nascimento date,
  castrado boolean,
  -- Caminho da foto no bucket "arquivos".
  foto text,
  -- Cores do desenho usado quando não há foto (ex.: {"coat": "caramelo", "spot": true}).
  aparencia jsonb not null default '{}',
  saude text,
  comportamento text,
  alimentacao text,
  especial boolean not null default false,
  especial_detalhe text,
  fica_separado boolean not null default false,
  observacoes text,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id)
);

create table public.cao_tutores (
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  cao_id uuid not null,
  tutor_id uuid not null,
  principal boolean not null default false,
  primary key (cao_id, tutor_id),
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id) on delete cascade,
  foreign key (negocio_id, tutor_id) references public.tutores (negocio_id, id) on delete cascade
);

create index cao_tutores_tutor_id_idx on public.cao_tutores (tutor_id);
-- No máximo um tutor principal por cão.
create unique index cao_tutores_um_principal_idx on public.cao_tutores (cao_id) where principal;

create table public.vacinas (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  cao_id uuid not null,
  nome text not null,
  aplicada_em date,
  valida_ate date,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id) on delete cascade,
  check (valida_ate is null or aplicada_em is null or valida_ate >= aplicada_em)
);

create index vacinas_cao_id_idx on public.vacinas (cao_id);

create table public.anexos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  cao_id uuid not null,
  nome text not null,
  -- Livre: carteira de vacina, receita, termo...
  tipo text,
  -- Caminho no bucket "arquivos".
  arquivo text not null,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id) on delete cascade
);

create index anexos_cao_id_idx on public.anexos (cao_id);

create table public.medicacoes (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  cao_id uuid not null,
  remedio text not null,
  dose text,
  horarios time[] not null default '{}',
  -- Sem fim = medicação contínua.
  inicio date,
  fim date,
  instrucoes text,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id),
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id) on delete cascade,
  check (fim is null or inicio is null or fim >= inicio)
);

create index medicacoes_cao_id_idx on public.medicacoes (cao_id);

create trigger tutores_atualizado_em
  before update on public.tutores
  for each row execute function privado.tocar_atualizado_em();
create trigger caes_atualizado_em
  before update on public.caes
  for each row execute function privado.tocar_atualizado_em();
create trigger medicacoes_atualizado_em
  before update on public.medicacoes
  for each row execute function privado.tocar_atualizado_em();

alter table public.tutores enable row level security;
alter table public.caes enable row level security;
alter table public.cao_tutores enable row level security;
alter table public.vacinas enable row level security;
alter table public.anexos enable row level security;
alter table public.medicacoes enable row level security;

create policy "membros do negócio" on public.tutores for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.caes for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.cao_tutores for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.vacinas for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.anexos for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.medicacoes for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
