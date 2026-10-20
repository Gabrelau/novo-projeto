-- Bucket privado para fotos e anexos. Todo arquivo fica numa pasta com o
-- id do negócio: <negocio_id>/caes/<cao_id>/<arquivo>.

insert into storage.buckets (id, name, public)
values ('arquivos', 'arquivos', false)
on conflict (id) do nothing;

create policy "membros acessam arquivos do negócio" on storage.objects
  for all to authenticated
  using (
    bucket_id = 'arquivos'
    and (storage.foldername(name))[1] in (select n::text from privado.meus_negocios() as n)
  )
  with check (
    bucket_id = 'arquivos'
    and (storage.foldername(name))[1] in (select n::text from privado.meus_negocios() as n)
  );
