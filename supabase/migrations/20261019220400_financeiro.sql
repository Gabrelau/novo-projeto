-- Financeiro: o que deve ser pago (cobranças) separado do que foi pago
-- (pagamentos). Uma cobrança pode receber mais de um pagamento.

create type public.tipo_cobranca as enum ('integral', 'sinal', 'restante', 'avulsa');
create type public.forma_pagamento as enum ('pix', 'dinheiro');

create table public.pacotes (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  tutor_id uuid not null,
  servico_id uuid not null,
  quantidade integer not null check (quantidade > 0),
  usados integer not null default 0 check (usados >= 0),
  valor numeric(10, 2) not null check (valor >= 0),
  validade date,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id),
  foreign key (negocio_id, tutor_id) references public.tutores (negocio_id, id),
  foreign key (negocio_id, servico_id) references public.servicos (negocio_id, id),
  check (usados <= quantidade)
);

create index pacotes_tutor_id_idx on public.pacotes (tutor_id);

create table public.cobrancas (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  tutor_id uuid not null,
  reserva_id uuid,
  pacote_id uuid,
  tipo public.tipo_cobranca not null,
  descricao text,
  valor numeric(10, 2) not null check (valor > 0),
  vencimento date not null,
  cancelada_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (negocio_id, id),
  foreign key (negocio_id, tutor_id) references public.tutores (negocio_id, id),
  foreign key (negocio_id, reserva_id) references public.reservas (negocio_id, id),
  foreign key (negocio_id, pacote_id) references public.pacotes (negocio_id, id),
  check (reserva_id is null or pacote_id is null)
);

create index cobrancas_negocio_vencimento_idx on public.cobrancas (negocio_id, vencimento);
create index cobrancas_reserva_id_idx on public.cobrancas (reserva_id);
create index cobrancas_tutor_id_idx on public.cobrancas (tutor_id);

create table public.pagamentos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  cobranca_id uuid not null,
  valor numeric(10, 2) not null check (valor > 0),
  forma public.forma_pagamento not null,
  pago_em timestamptz not null default now(),
  observacoes text,
  criado_em timestamptz not null default now(),
  foreign key (negocio_id, cobranca_id) references public.cobrancas (negocio_id, id)
);

create index pagamentos_cobranca_id_idx on public.pagamentos (cobranca_id);
create index pagamentos_negocio_pago_em_idx on public.pagamentos (negocio_id, pago_em);

create trigger pacotes_atualizado_em
  before update on public.pacotes
  for each row execute function privado.tocar_atualizado_em();
create trigger cobrancas_atualizado_em
  before update on public.cobrancas
  for each row execute function privado.tocar_atualizado_em();

alter table public.pacotes enable row level security;
alter table public.cobrancas enable row level security;
alter table public.pagamentos enable row level security;

create policy "membros do negócio" on public.pacotes for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.cobrancas for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));
create policy "membros do negócio" on public.pagamentos for all to authenticated
  using (negocio_id in (select privado.meus_negocios()))
  with check (negocio_id in (select privado.meus_negocios()));

-- Cobranças com o quanto já foi pago e a situação, para a lista de
-- pendências. security_invoker faz a view respeitar as regras de acesso
-- de quem consulta. A data de hoje é a de Brasília.
create view public.cobrancas_situacao
with (security_invoker = true)
as
select
  c.*,
  coalesce(p.pago, 0)::numeric(10, 2) as valor_pago,
  (c.valor - coalesce(p.pago, 0))::numeric(10, 2) as valor_aberto,
  case
    when c.cancelada_em is not null then 'cancelada'
    when coalesce(p.pago, 0) >= c.valor then 'paga'
    when c.vencimento < (now() at time zone 'America/Sao_Paulo')::date then 'atrasada'
    else 'pendente'
  end as situacao
from public.cobrancas c
left join (
  select cobranca_id, sum(valor) as pago
  from public.pagamentos
  group by cobranca_id
) p on p.cobranca_id = c.id;
