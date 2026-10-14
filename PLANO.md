# Plano do MVP

App para profissionais do mundo pet canino: donos de hotel, passeadores, cuidadores e adestradores. Serve para organizar a rotina de trabalho.

## Decisões

| Tema | Decisão |
|---|---|
| Plataforma | Mobile com Expo (SDK 57, Expo Router), Android e iOS |
| Backend | Supabase (Postgres, Auth, Storage) |
| Usuários | Somente o profissional, uma conta por usuário. Sem equipe e sem acesso do tutor no MVP |
| Idioma | pt-BR |

## Escopo do MVP

1. **Cadastro de clientes e cães**: tutores (nome, telefone, endereço) e cães (raça, porte, nascimento, vacinas, restrições, remédios, observações).
2. **Agenda de atendimentos**: passeio, hospedagem, creche, sessão de adestramento e visita de cuidador. Visão de dia e de semana, com status agendado, realizado ou cancelado e opção de recorrência.
3. **Lembretes e notificações**: aviso antes de um atendimento, vacina vencendo e horário de remédio durante a hospedagem. Notificações locais via `expo-notifications`.
4. **Financeiro**: preço por tipo de serviço, pacotes (ex.: 10 passeios), pagamentos recebidos e pendentes e resumo do mês.

## Modelo de dados inicial (Supabase)

Todas as tabelas têm `profissional_id` e RLS que restringe o acesso a `auth.uid()`.

- `profissionais`: perfil, tipo(s) de serviço que oferece
- `tutores`
- `caes`: `tutor_id`
- `vacinas`: `cao_id`, nome, data de aplicação, data de validade
- `servicos`: tipo, nome, preço padrão, duração
- `atendimentos`: `cao_id`, `servico_id`, início, fim, status, valor, observações, `recorrencia`
- `pacotes`: `tutor_id`, `servico_id`, quantidade, usados, valor
- `pagamentos`: `tutor_id`, `atendimento_id` ou `pacote_id`, valor, data, forma, status
- `lembretes`: tipo, referência, data e hora, enviado

## Ordem de implementação

1. Limpar o template (`npm run reset-project`), definir tema, navegação em abas (Agenda, Clientes, Financeiro, Ajustes) e a pasta `src/lib`.
2. Configurar o Supabase: projeto, migrations em `supabase/migrations`, cliente com `@supabase/supabase-js` e login por e-mail.
3. CRUD de tutores e cães.
4. Agenda e atendimentos.
5. Lembretes (notificações locais).
6. Financeiro.
7. Builds de teste via EAS.

## Pendências

- Definir o nome do app (a pasta atual se chama `novo-projeto`).
- Criar o projeto no Supabase e colocar `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` no `.env`.
