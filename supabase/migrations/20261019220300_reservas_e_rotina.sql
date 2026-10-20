-- Reservas (substituem "atendimentos"), lista de espera, pertences,
-- rotina do dia e ocorrências.

create type public.etapa_reserva as enum ('orcamento', 'confirmada', 'em_andamento', 'finalizada', 'cancelada');

create table public.reservas (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  tutor_id uuid not null,
  servico_id uuid not null,
  entrada timestamptz not null,
  saida timestamptz not null,
  etapa public.etapa_reserva not null default 'orcamento',
  -- Resultado da calculadora; valor_final pode ser editado à mão.
  valor_calculado numeric(10, 2) check (valor_calculado >= 0),
  desconto numeric(10, 2) not null default 0 check (desconto >= 0),
  valor_final numeric(10, 2) check (valor_final >= 0),
  observacoes text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id),
  foreign key (negocio_id, tutor_id) references public.tutores (negocio_id, id),
  foreign key (negocio_id, servico_id) references public.servicos (negocio_id, id),
  check (saida > entrada)
);

create index reservas_negocio_periodo_idx on public.reservas (negocio_id, entrada, saida);
create index reservas_tutor_id_idx on public.reservas (tutor_id);

create table public.reserva_caes (
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  reserva_id uuid not null,
  cao_id uuid not null,
  -- Ficha da estadia: rotina e cuidados deste cão nesta reserva.
  cuidados text,
  primary key (reserva_id, cao_id),
  unique (negocio_id, reserva_id, cao_id),
  foreign key (negocio_id, reserva_id) references public.reservas (negocio_id, id) on delete cascade,
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id)
);

create index reserva_caes_cao_id_idx on public.reserva_caes (cao_id);

create table public.adicionais_reserva (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  reserva_id uuid not null,
  -- Serviço de modalidade "adicional" (leva e traz, banho...).
  servico_id uuid not null,
  quando timestamptz,
  valor numeric(10, 2) not null check (valor >= 0),
  observacoes text,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, reserva_id) references public.reservas (negocio_id, id) on delete cascade,
  foreign key (negocio_id, servico_id) references public.servicos (negocio_id, id)
);

create index adicionais_reserva_reserva_id_idx on public.adicionais_reserva (reserva_id);

create type public.situacao_espera as enum ('aguardando', 'atendido', 'desistiu');

create table public.lista_espera (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  tutor_id uuid not null,
  servico_id uuid not null,
  -- Cães do pedido. Sem chave estrangeira: é só um pedido, vira reserva depois.
  caes uuid[] not null default '{}',
  entrada timestamptz not null,
  saida timestamptz not null,
  situacao public.situacao_espera not null default 'aguardando',
  reserva_id uuid,
  observacoes text,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, tutor_id) references public.tutores (negocio_id, id) on delete cascade,
  foreign key (negocio_id, servico_id) references public.servicos (negocio_id, id),
  foreign key (negocio_id, reserva_id) references public.reservas (negocio_id, id) on delete set null (reserva_id),
  check (saida > entrada)
);

create index lista_espera_negocio_periodo_idx on public.lista_espera (negocio_id, entrada, saida);

create table public.pertences (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  reserva_id uuid not null,
  cao_id uuid not null,
  descricao text not null,
  quantidade integer not null default 1 check (quantidade > 0),
  -- Caminho no bucket "arquivos".
  foto text,
  devolvido_em timestamptz,
  criado_em timestamptz not null default now(),
  -- O cão precisa estar na reserva.
  foreign key (negocio_id, reserva_id, cao_id)
    references public.reserva_caes (negocio_id, reserva_id, cao_id) on delete cascade
);

create index pertences_reserva_id_idx on public.pertences (reserva_id);

create type public.tipo_tarefa as enum ('refeicao', 'remedio', 'outra');

create table public.tarefas (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  -- Sem cão = tarefa de todos os hóspedes (ex.: café da manhã).
  cao_id uuid,
  reserva_id uuid,
  medicacao_id uuid,
  tipo public.tipo_tarefa not null,
  titulo text not null,
  detalhe text,
  dia date not null,
  horario time,
  feita_em timestamptz,
  -- Nome livre de quem fez, enquanto os ajudantes não têm conta.
  feita_por text,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id) on delete cascade,
  foreign key (negocio_id, reserva_id) references public.reservas (negocio_id, id) on delete cascade,
  foreign key (negocio_id, medicacao_id) references public.medicacoes (negocio_id, id) on delete set null (medicacao_id)
);

create index tarefas_negocio_dia_idx on public.tarefas (negocio_id, dia, horario);

create type public.gravidade as enum ('leve', 'moderada', 'grave');

create table public.ocorrencias (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  cao_id uuid not null,
  reserva_id uuid,
  -- Livre: briga, machucado, vômito, fuga...
  tipo text not null,
  gravidade public.gravidade not null default 'leve',
  descricao text,
  -- Caminhos no bucket "arquivos".
  fotos text[] not null default '{}',
  aconteceu_em timestamptz not null default now(),
  tutor_avisado_em timestamptz,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, cao_id) references public.caes (negocio_id, id) on delete cascade,
  foreign key (negocio_id, reserva_id) references public.reservas (negocio_id, id) on delete set null (reserva_id)
);

create index ocorrencias_cao_id_idx on public.ocorrencias (cao_id, aconteceu_em desc);

create trigger reservas_atualizado_em
  before update on public.reservas
  for each row execute function privado.tocar_atualizado_em();

alter table public.reservas enable row level security;
alter table public.reserva_caes enable row level security;
alter table public.adicionais_reserva enable row level security;
alter table public.lista_espera enable row level security;
alter table public.pertences enable row level security;
alter table public.tarefas enable row level security;
alter table public.ocorrencias enable row level security;

create policy "membros do negócio" on public.reservas for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.reserva_caes for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.adicionais_reserva for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.lista_espera for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.pertences for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.tarefas for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.ocorrencias for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
