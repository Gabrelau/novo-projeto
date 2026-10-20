# Plano do MVP

App para profissionais do mundo pet canino: donos de hotel, passeadores, cuidadores e adestradores. Serve para organizar a rotina de trabalho.

## Decisões

| Tema | Decisão |
|---|---|
| Plataforma | Mobile com Expo (SDK 57, Expo Router), Android e iOS |
| Backend | Supabase (Postgres, Auth, Storage) |
| Usuários | Uma conta (o dono) no MVP, com os dados por negócio para os ajudantes entrarem na Fase 2. Sem acesso do tutor no MVP |
| Idioma | pt-BR |

## Escopo do MVP

1. **Cadastro de clientes e cães**: tutores (nome, telefone, endereço) e cães (raça, porte, nascimento, vacinas, restrições, remédios, observações).
2. **Agenda de atendimentos**: passeio, hospedagem, creche, sessão de adestramento e visita de cuidador. Visão de dia e de semana, com status agendado, realizado ou cancelado e opção de recorrência.
3. **Lembretes e notificações**: aviso antes de um atendimento, vacina vencendo e horário de remédio durante a hospedagem. Notificações locais via `expo-notifications`.
4. **Financeiro**: preço por tipo de serviço, pacotes (ex.: 10 passeios), pagamentos recebidos e pendentes e resumo do mês.

## Modelo de dados (Supabase)

Aplicado no projeto em 2026-10-20 pelas migrations de `supabase/migrations`. Os dados pertencem a um **negócio**, e não a uma pessoa: toda tabela tem `negocio_id`, e a RLS libera o acesso a quem está em `membros`. No MVP o único membro é o dono; os ajudantes entram na Fase 2 sem migrar dados. O app cria o negócio pela função `criar_negocio`, que também registra o dono.

| Área | Tabelas |
|---|---|
| Acesso | `negocios` (capacidade, horário da diária, modalidades), `membros` |
| Clientes e cães | `tutores`, `caes`, `cao_tutores` (vários tutores por cão, um principal), `vacinas`, `anexos`, `medicacoes` |
| Serviços e preços | `servicos` (modalidade: estadia, diária, sessão ou adicional), `temporadas`, `precos` (faixa por número de cães, cão extra e especial, normal ou alta temporada) |
| Reservas e rotina | `reservas` (substituem atendimentos), `reserva_caes`, `adicionais_reserva`, `lista_espera`, `pertences`, `tarefas`, `ocorrencias` |
| Financeiro | `cobrancas` (integral, sinal, restante), `pagamentos`, `pacotes` e a view `cobrancas_situacao` |

Fotos e anexos ficam no bucket privado `arquivos`, numa pasta por negócio. Não há tabela de lembretes: as notificações são agendadas no aparelho a partir das tarefas, reservas e cobranças.

Para mudar o banco, crie uma nova migration e aplique com `npx supabase db push --db-url "$SUPABASE_DB_URL"`.

## Ordem de implementação

1. Limpar o template (`npm run reset-project`), definir tema, navegação em abas (Agenda, Clientes, Financeiro, Ajustes) e a pasta `src/lib`.
2. Configurar o Supabase: projeto, migrations em `supabase/migrations`, cliente com `@supabase/supabase-js` (`src/lib/supabase.ts`) e login por código enviado ao e-mail (`src/app/entrar.tsx`). Depois do primeiro login, o app pede o nome do negócio (`src/app/novo-negocio.tsx`).
3. CRUD de tutores e cães.
4. Agenda e atendimentos.
5. Lembretes (notificações locais).
6. Financeiro.
7. Builds de teste via EAS.

## Pendências

- Definir o nome do app (a pasta atual se chama `novo-projeto`).
- O projeto do Supabase ficou na região us-east-2 (Ohio). Decidir se recria em São Paulo antes de ter dados reais.
- O código de login só chega se o modelo de e-mail "Magic link" tiver `{{ .Token }}`. Projetos gratuitos criados depois de 3 de junho de 2026 não podem editar os modelos usando o envio padrão do Supabase, que também só entrega para e-mails da equipe do projeto e tem limite baixo por hora. É preciso configurar um SMTP próprio (Resend, Postmark, SES etc.) e então trocar o modelo.
