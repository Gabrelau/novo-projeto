-- Serviços, alta temporada e tabela de preços.

create table public.servicos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  nome text not null check (length(trim(nome)) > 0),
  modalidade public.modalidade not null,
  -- Para sessões (passeio, adestramento, banho e tosa).
  duracao_min integer check (duracao_min > 0),
  ocupa_vaga boolean not null default false,
  ativo boolean not null default true,
  ordem integer not null default 0,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id)
);

create table public.temporadas (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  nome text not null,
  inicio date not null,
  fim date not null,
  criado_em timestamptz not null default now(),
  check (fim >= inicio)
);

create index temporadas_negocio_periodo_idx on public.temporadas (negocio_id, inicio, fim);

-- Cada linha é um valor da tabela de preços de um serviço:
-- * faixa: valor da diária para N cães da mesma família;
-- * cao_extra: quanto soma cada cão além da maior faixa;
-- * especial: valor do cão com necessidade especial.
-- Ainda em aberto com a cliente: o especial substitui ou soma à faixa?
create type public.tipo_preco as enum ('faixa', 'cao_extra', 'especial');

create table public.precos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  servico_id uuid not null,
  tipo public.tipo_preco not null default 'faixa',
  alta_temporada boolean not null default false,
  caes smallint check (caes > 0),
  valor numeric(10, 2) not null check (valor >= 0),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  foreign key (negocio_id, servico_id) references public.servicos (negocio_id, id) on delete cascade,
  check ((tipo = 'faixa') = (caes is not null))
);

create unique index precos_unico_idx
  on public.precos (servico_id, tipo, alta_temporada, coalesce(caes, 0));

create trigger servicos_atualizado_em
  before update on public.servicos
  for each row execute function privado.tocar_atualizado_em();
create trigger precos_atualizado_em
  before update on public.precos
  for each row execute function privado.tocar_atualizado_em();

alter table public.servicos enable row level security;
alter table public.temporadas enable row level security;
alter table public.precos enable row level security;

create policy "membros do negócio" on public.servicos for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.temporadas for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.precos for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
