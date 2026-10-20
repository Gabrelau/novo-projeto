-- Negócios e membros: base do controle de acesso.
-- Todos os dados pertencem a um negócio (negocio_id). Quem é membro do
-- negócio enxerga e altera os dados dele. No MVP só existe o dono; os
-- ajudantes entram na Fase 2 sem precisar migrar dados.

-- Funções internas ficam fora do schema public para não virarem RPC.
create schema privado;
revoke all on schema privado from public;
grant usage on schema privado to authenticated;

create type public.modalidade as enum ('estadia', 'diaria', 'sessao', 'adicional');
create type public.papel_membro as enum ('dono', 'ajudante');

create function privado.tocar_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

create table public.negocios (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (length(trim(nome)) > 0),
  capacidade integer not null default 10 check (capacidade > 0),
  -- Horário em que a diária vira (ex.: 12h às 12h).
  horario_corte time not null default '12:00',
  modalidades public.modalidade[] not null default '{}',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create trigger negocios_atualizado_em
  before update on public.negocios
  for each row execute function privado.tocar_atualizado_em();

create table public.membros (
  negocio_id uuid not null references public.negocios (id) on delete cascade,
  usuario_id uuid not null references auth.users (id) on delete cascade,
  papel public.papel_membro not null default 'ajudante',
  criado_em timestamptz not null default now(),
  primary key (negocio_id, usuario_id)
);

create index membros_usuario_id_idx on public.membros (usuario_id);

-- security definer: as regras de membros consultam membros, e sem isso
-- a consulta entraria em recursão.
create function privado.meus_negocios()
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $$
  select negocio_id from public.membros where usuario_id = (select auth.uid());
$$;

create function privado.sou_dono(negocio uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.membros
    where negocio_id = negocio
      and usuario_id = (select auth.uid())
      and papel = 'dono'
  );
$$;

revoke execute on function privado.meus_negocios() from public;
revoke execute on function privado.sou_dono(uuid) from public;
grant execute on function privado.meus_negocios() to authenticated;
grant execute on function privado.sou_dono(uuid) to authenticated;

alter table public.negocios enable row level security;

create policy "membros veem o negócio" on public.negocios
  for select to authenticated
  using (id in (select privado.meus_negocios()));

create policy "dono altera o negócio" on public.negocios
  for update to authenticated
  using (privado.sou_dono(id))
  with check (privado.sou_dono(id));

alter table public.membros enable row level security;

-- Convites e remoção de membros ficam para a Fase 2.
create policy "membros veem a equipe" on public.membros
  for select to authenticated
  using (negocio_id in (select privado.meus_negocios()));

-- O negócio é criado por esta função, e não por insert direto, porque o
-- criador precisa virar dono na mesma transação para conseguir ler o
-- negócio que acabou de criar.
create function public.criar_negocio(
  nome text,
  capacidade integer default 10,
  horario_corte time default '12:00',
  modalidades public.modalidade[] default '{}'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  novo_id uuid;
begin
  if (select auth.uid()) is null then
    raise exception 'É preciso estar logado para criar um negócio';
  end if;

  insert into public.negocios (nome, capacidade, horario_corte, modalidades)
  values (
    criar_negocio.nome,
    criar_negocio.capacidade,
    criar_negocio.horario_corte,
    criar_negocio.modalidades
  )
  returning id into novo_id;

  insert into public.membros (negocio_id, usuario_id, papel)
  values (novo_id, (select auth.uid()), 'dono');

  return novo_id;
end;
$$;

revoke execute on function public.criar_negocio(text, integer, time, public.modalidade[]) from public, anon;
grant execute on function public.criar_negocio(text, integer, time, public.modalidade[]) to authenticated;
