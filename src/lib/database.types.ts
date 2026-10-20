// Gerado a partir do banco do Supabase. Não edite à mão: depois de uma
// migration nova, gere de novo (MCP `generate_typescript_types` ou
// `npx supabase gen types typescript --project-id zqgunxtntggtzjbwqdzu`).

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      adicionais_reserva: {
        Row: {
          criado_em: string
          id: string
          negocio_id: string
          observacoes: string | null
          quando: string | null
          reserva_id: string
          servico_id: string
          valor: number
        }
        Insert: {
          criado_em?: string
          id?: string
          negocio_id: string
          observacoes?: string | null
          quando?: string | null
          reserva_id: string
          servico_id: string
          valor: number
        }
        Update: {
          criado_em?: string
          id?: string
          negocio_id?: string
          observacoes?: string | null
          quando?: string | null
          reserva_id?: string
          servico_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "adicionais_reserva_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adicionais_reserva_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "adicionais_reserva_negocio_id_servico_id_fkey"
            columns: ["negocio_id", "servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      anexos: {
        Row: {
          arquivo: string
          cao_id: string
          criado_em: string
          id: string
          negocio_id: string
          nome: string
          tipo: string | null
        }
        Insert: {
          arquivo: string
          cao_id: string
          criado_em?: string
          id?: string
          negocio_id: string
          nome: string
          tipo?: string | null
        }
        Update: {
          arquivo?: string
          cao_id?: string
          criado_em?: string
          id?: string
          negocio_id?: string
          nome?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anexos_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "anexos_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      caes: {
        Row: {
          alimentacao: string | null
          aparencia: Json
          ativo: boolean
          atualizado_em: string
          castrado: boolean | null
          comportamento: string | null
          criado_em: string
          especial: boolean
          especial_detalhe: string | null
          especie: Database["public"]["Enums"]["especie"]
          fica_separado: boolean
          foto: string | null
          id: string
          nascimento: string | null
          negocio_id: string
          nome: string
          observacoes: string | null
          porte: Database["public"]["Enums"]["porte"] | null
          raca: string | null
          saude: string | null
          sexo: Database["public"]["Enums"]["sexo"] | null
        }
        Insert: {
          alimentacao?: string | null
          aparencia?: Json
          ativo?: boolean
          atualizado_em?: string
          castrado?: boolean | null
          comportamento?: string | null
          criado_em?: string
          especial?: boolean
          especial_detalhe?: string | null
          especie?: Database["public"]["Enums"]["especie"]
          fica_separado?: boolean
          foto?: string | null
          id?: string
          nascimento?: string | null
          negocio_id: string
          nome: string
          observacoes?: string | null
          porte?: Database["public"]["Enums"]["porte"] | null
          raca?: string | null
          saude?: string | null
          sexo?: Database["public"]["Enums"]["sexo"] | null
        }
        Update: {
          alimentacao?: string | null
          aparencia?: Json
          ativo?: boolean
          atualizado_em?: string
          castrado?: boolean | null
          comportamento?: string | null
          criado_em?: string
          especial?: boolean
          especial_detalhe?: string | null
          especie?: Database["public"]["Enums"]["especie"]
          fica_separado?: boolean
          foto?: string | null
          id?: string
          nascimento?: string | null
          negocio_id?: string
          nome?: string
          observacoes?: string | null
          porte?: Database["public"]["Enums"]["porte"] | null
          raca?: string | null
          saude?: string | null
          sexo?: Database["public"]["Enums"]["sexo"] | null
        }
        Relationships: [
          {
            foreignKeyName: "caes_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      cao_tutores: {
        Row: {
          cao_id: string
          negocio_id: string
          principal: boolean
          tutor_id: string
        }
        Insert: {
          cao_id: string
          negocio_id: string
          principal?: boolean
          tutor_id: string
        }
        Update: {
          cao_id?: string
          negocio_id?: string
          principal?: boolean
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cao_tutores_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "cao_tutores_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cao_tutores_negocio_id_tutor_id_fkey"
            columns: ["negocio_id", "tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      cobrancas: {
        Row: {
          atualizado_em: string
          cancelada_em: string | null
          criado_em: string
          descricao: string | null
          id: string
          negocio_id: string
          pacote_id: string | null
          reserva_id: string | null
          tipo: Database["public"]["Enums"]["tipo_cobranca"]
          tutor_id: string
          valor: number
          vencimento: string
        }
        Insert: {
          atualizado_em?: string
          cancelada_em?: string | null
          criado_em?: string
          descricao?: string | null
          id?: string
          negocio_id: string
          pacote_id?: string | null
          reserva_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_cobranca"]
          tutor_id: string
          valor: number
          vencimento: string
        }
        Update: {
          atualizado_em?: string
          cancelada_em?: string | null
          criado_em?: string
          descricao?: string | null
          id?: string
          negocio_id?: string
          pacote_id?: string | null
          reserva_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_cobranca"]
          tutor_id?: string
          valor?: number
          vencimento?: string
        }
        Relationships: [
          {
            foreignKeyName: "cobrancas_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cobrancas_negocio_id_pacote_id_fkey"
            columns: ["negocio_id", "pacote_id"]
            isOneToOne: false
            referencedRelation: "pacotes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "cobrancas_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "cobrancas_negocio_id_tutor_id_fkey"
            columns: ["negocio_id", "tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      lista_espera: {
        Row: {
          caes: string[]
          criado_em: string
          entrada: string
          id: string
          negocio_id: string
          observacoes: string | null
          reserva_id: string | null
          saida: string
          servico_id: string
          situacao: Database["public"]["Enums"]["situacao_espera"]
          tutor_id: string
        }
        Insert: {
          caes?: string[]
          criado_em?: string
          entrada: string
          id?: string
          negocio_id: string
          observacoes?: string | null
          reserva_id?: string | null
          saida: string
          servico_id: string
          situacao?: Database["public"]["Enums"]["situacao_espera"]
          tutor_id: string
        }
        Update: {
          caes?: string[]
          criado_em?: string
          entrada?: string
          id?: string
          negocio_id?: string
          observacoes?: string | null
          reserva_id?: string | null
          saida?: string
          servico_id?: string
          situacao?: Database["public"]["Enums"]["situacao_espera"]
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lista_espera_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lista_espera_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "lista_espera_negocio_id_servico_id_fkey"
            columns: ["negocio_id", "servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "lista_espera_negocio_id_tutor_id_fkey"
            columns: ["negocio_id", "tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      medicacoes: {
        Row: {
          ativo: boolean
          atualizado_em: string
          cao_id: string
          criado_em: string
          dose: string | null
          fim: string | null
          horarios: string[]
          id: string
          inicio: string | null
          instrucoes: string | null
          negocio_id: string
          remedio: string
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          cao_id: string
          criado_em?: string
          dose?: string | null
          fim?: string | null
          horarios?: string[]
          id?: string
          inicio?: string | null
          instrucoes?: string | null
          negocio_id: string
          remedio: string
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          cao_id?: string
          criado_em?: string
          dose?: string | null
          fim?: string | null
          horarios?: string[]
          id?: string
          inicio?: string | null
          instrucoes?: string | null
          negocio_id?: string
          remedio?: string
        }
        Relationships: [
          {
            foreignKeyName: "medicacoes_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "medicacoes_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      membros: {
        Row: {
          criado_em: string
          negocio_id: string
          papel: Database["public"]["Enums"]["papel_membro"]
          usuario_id: string
        }
        Insert: {
          criado_em?: string
          negocio_id: string
          papel?: Database["public"]["Enums"]["papel_membro"]
          usuario_id: string
        }
        Update: {
          criado_em?: string
          negocio_id?: string
          papel?: Database["public"]["Enums"]["papel_membro"]
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membros_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      negocios: {
        Row: {
          atualizado_em: string
          capacidade: number
          criado_em: string
          horario_corte: string
          id: string
          modalidades: Database["public"]["Enums"]["modalidade"][]
          nome: string
        }
        Insert: {
          atualizado_em?: string
          capacidade?: number
          criado_em?: string
          horario_corte?: string
          id?: string
          modalidades?: Database["public"]["Enums"]["modalidade"][]
          nome: string
        }
        Update: {
          atualizado_em?: string
          capacidade?: number
          criado_em?: string
          horario_corte?: string
          id?: string
          modalidades?: Database["public"]["Enums"]["modalidade"][]
          nome?: string
        }
        Relationships: []
      }
      ocorrencias: {
        Row: {
          aconteceu_em: string
          cao_id: string
          criado_em: string
          descricao: string | null
          fotos: string[]
          gravidade: Database["public"]["Enums"]["gravidade"]
          id: string
          negocio_id: string
          reserva_id: string | null
          tipo: string
          tutor_avisado_em: string | null
        }
        Insert: {
          aconteceu_em?: string
          cao_id: string
          criado_em?: string
          descricao?: string | null
          fotos?: string[]
          gravidade?: Database["public"]["Enums"]["gravidade"]
          id?: string
          negocio_id: string
          reserva_id?: string | null
          tipo: string
          tutor_avisado_em?: string | null
        }
        Update: {
          aconteceu_em?: string
          cao_id?: string
          criado_em?: string
          descricao?: string | null
          fotos?: string[]
          gravidade?: Database["public"]["Enums"]["gravidade"]
          id?: string
          negocio_id?: string
          reserva_id?: string | null
          tipo?: string
          tutor_avisado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "ocorrencias_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      pacotes: {
        Row: {
          atualizado_em: string
          criado_em: string
          id: string
          negocio_id: string
          quantidade: number
          servico_id: string
          tutor_id: string
          usados: number
          validade: string | null
          valor: number
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          negocio_id: string
          quantidade: number
          servico_id: string
          tutor_id: string
          usados?: number
          validade?: string | null
          valor: number
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          negocio_id?: string
          quantidade?: number
          servico_id?: string
          tutor_id?: string
          usados?: number
          validade?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pacotes_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pacotes_negocio_id_servico_id_fkey"
            columns: ["negocio_id", "servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "pacotes_negocio_id_tutor_id_fkey"
            columns: ["negocio_id", "tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          cobranca_id: string
          criado_em: string
          forma: Database["public"]["Enums"]["forma_pagamento"]
          id: string
          negocio_id: string
          observacoes: string | null
          pago_em: string
          valor: number
        }
        Insert: {
          cobranca_id: string
          criado_em?: string
          forma: Database["public"]["Enums"]["forma_pagamento"]
          id?: string
          negocio_id: string
          observacoes?: string | null
          pago_em?: string
          valor: number
        }
        Update: {
          cobranca_id?: string
          criado_em?: string
          forma?: Database["public"]["Enums"]["forma_pagamento"]
          id?: string
          negocio_id?: string
          observacoes?: string | null
          pago_em?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_negocio_id_cobranca_id_fkey"
            columns: ["negocio_id", "cobranca_id"]
            isOneToOne: false
            referencedRelation: "cobrancas"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "pagamentos_negocio_id_cobranca_id_fkey"
            columns: ["negocio_id", "cobranca_id"]
            isOneToOne: false
            referencedRelation: "cobrancas_situacao"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "pagamentos_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      pertences: {
        Row: {
          cao_id: string
          criado_em: string
          descricao: string
          devolvido_em: string | null
          foto: string | null
          id: string
          negocio_id: string
          quantidade: number
          reserva_id: string
        }
        Insert: {
          cao_id: string
          criado_em?: string
          descricao: string
          devolvido_em?: string | null
          foto?: string | null
          id?: string
          negocio_id: string
          quantidade?: number
          reserva_id: string
        }
        Update: {
          cao_id?: string
          criado_em?: string
          descricao?: string
          devolvido_em?: string | null
          foto?: string | null
          id?: string
          negocio_id?: string
          quantidade?: number
          reserva_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pertences_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pertences_negocio_id_reserva_id_cao_id_fkey"
            columns: ["negocio_id", "reserva_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "reserva_caes"
            referencedColumns: ["negocio_id", "reserva_id", "cao_id"]
          },
        ]
      }
      precos: {
        Row: {
          alta_temporada: boolean
          atualizado_em: string
          caes: number | null
          criado_em: string
          id: string
          negocio_id: string
          servico_id: string
          tipo: Database["public"]["Enums"]["tipo_preco"]
          valor: number
        }
        Insert: {
          alta_temporada?: boolean
          atualizado_em?: string
          caes?: number | null
          criado_em?: string
          id?: string
          negocio_id: string
          servico_id: string
          tipo?: Database["public"]["Enums"]["tipo_preco"]
          valor: number
        }
        Update: {
          alta_temporada?: boolean
          atualizado_em?: string
          caes?: number | null
          criado_em?: string
          id?: string
          negocio_id?: string
          servico_id?: string
          tipo?: Database["public"]["Enums"]["tipo_preco"]
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "precos_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "precos_negocio_id_servico_id_fkey"
            columns: ["negocio_id", "servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      reserva_caes: {
        Row: {
          cao_id: string
          cuidados: string | null
          negocio_id: string
          reserva_id: string
        }
        Insert: {
          cao_id: string
          cuidados?: string | null
          negocio_id: string
          reserva_id: string
        }
        Update: {
          cao_id?: string
          cuidados?: string | null
          negocio_id?: string
          reserva_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reserva_caes_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "reserva_caes_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reserva_caes_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      reservas: {
        Row: {
          atualizado_em: string
          criado_em: string
          desconto: number
          entrada: string
          etapa: Database["public"]["Enums"]["etapa_reserva"]
          id: string
          negocio_id: string
          observacoes: string | null
          saida: string
          servico_id: string
          tutor_id: string
          valor_calculado: number | null
          valor_final: number | null
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          desconto?: number
          entrada: string
          etapa?: Database["public"]["Enums"]["etapa_reserva"]
          id?: string
          negocio_id: string
          observacoes?: string | null
          saida: string
          servico_id: string
          tutor_id: string
          valor_calculado?: number | null
          valor_final?: number | null
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          desconto?: number
          entrada?: string
          etapa?: Database["public"]["Enums"]["etapa_reserva"]
          id?: string
          negocio_id?: string
          observacoes?: string | null
          saida?: string
          servico_id?: string
          tutor_id?: string
          valor_calculado?: number | null
          valor_final?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_negocio_id_servico_id_fkey"
            columns: ["negocio_id", "servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "reservas_negocio_id_tutor_id_fkey"
            columns: ["negocio_id", "tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      servicos: {
        Row: {
          ativo: boolean
          atualizado_em: string
          criado_em: string
          duracao_min: number | null
          id: string
          modalidade: Database["public"]["Enums"]["modalidade"]
          negocio_id: string
          nome: string
          ocupa_vaga: boolean
          ordem: number
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          duracao_min?: number | null
          id?: string
          modalidade: Database["public"]["Enums"]["modalidade"]
          negocio_id: string
          nome: string
          ocupa_vaga?: boolean
          ordem?: number
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          duracao_min?: number | null
          id?: string
          modalidade?: Database["public"]["Enums"]["modalidade"]
          negocio_id?: string
          nome?: string
          ocupa_vaga?: boolean
          ordem?: number
        }
        Relationships: [
          {
            foreignKeyName: "servicos_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      tarefas: {
        Row: {
          cao_id: string | null
          criado_em: string
          detalhe: string | null
          dia: string
          feita_em: string | null
          feita_por: string | null
          horario: string | null
          id: string
          medicacao_id: string | null
          negocio_id: string
          reserva_id: string | null
          tipo: Database["public"]["Enums"]["tipo_tarefa"]
          titulo: string
        }
        Insert: {
          cao_id?: string | null
          criado_em?: string
          detalhe?: string | null
          dia: string
          feita_em?: string | null
          feita_por?: string | null
          horario?: string | null
          id?: string
          medicacao_id?: string | null
          negocio_id: string
          reserva_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_tarefa"]
          titulo: string
        }
        Update: {
          cao_id?: string | null
          criado_em?: string
          detalhe?: string | null
          dia?: string
          feita_em?: string | null
          feita_por?: string | null
          horario?: string | null
          id?: string
          medicacao_id?: string | null
          negocio_id?: string
          reserva_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_tarefa"]
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "tarefas_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_negocio_id_medicacao_id_fkey"
            columns: ["negocio_id", "medicacao_id"]
            isOneToOne: false
            referencedRelation: "medicacoes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "tarefas_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
      temporadas: {
        Row: {
          criado_em: string
          fim: string
          id: string
          inicio: string
          negocio_id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          fim: string
          id?: string
          inicio: string
          negocio_id: string
          nome: string
        }
        Update: {
          criado_em?: string
          fim?: string
          id?: string
          inicio?: string
          negocio_id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "temporadas_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      tutores: {
        Row: {
          ativo: boolean
          atualizado_em: string
          criado_em: string
          email: string | null
          endereco: string | null
          id: string
          negocio_id: string
          nome: string
          observacoes: string | null
          telefone: string | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          email?: string | null
          endereco?: string | null
          id?: string
          negocio_id: string
          nome: string
          observacoes?: string | null
          telefone?: string | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          email?: string | null
          endereco?: string | null
          id?: string
          negocio_id?: string
          nome?: string
          observacoes?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutores_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      vacinas: {
        Row: {
          aplicada_em: string | null
          cao_id: string
          criado_em: string
          id: string
          negocio_id: string
          nome: string
          valida_ate: string | null
        }
        Insert: {
          aplicada_em?: string | null
          cao_id: string
          criado_em?: string
          id?: string
          negocio_id: string
          nome: string
          valida_ate?: string | null
        }
        Update: {
          aplicada_em?: string | null
          cao_id?: string
          criado_em?: string
          id?: string
          negocio_id?: string
          nome?: string
          valida_ate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vacinas_negocio_id_cao_id_fkey"
            columns: ["negocio_id", "cao_id"]
            isOneToOne: false
            referencedRelation: "caes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "vacinas_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      cobrancas_situacao: {
        Row: {
          atualizado_em: string | null
          cancelada_em: string | null
          criado_em: string | null
          descricao: string | null
          id: string | null
          negocio_id: string | null
          pacote_id: string | null
          reserva_id: string | null
          situacao: string | null
          tipo: Database["public"]["Enums"]["tipo_cobranca"] | null
          tutor_id: string | null
          valor: number | null
          valor_aberto: number | null
          valor_pago: number | null
          vencimento: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cobrancas_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cobrancas_negocio_id_pacote_id_fkey"
            columns: ["negocio_id", "pacote_id"]
            isOneToOne: false
            referencedRelation: "pacotes"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "cobrancas_negocio_id_reserva_id_fkey"
            columns: ["negocio_id", "reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["negocio_id", "id"]
          },
          {
            foreignKeyName: "cobrancas_negocio_id_tutor_id_fkey"
            columns: ["negocio_id", "tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["negocio_id", "id"]
          },
        ]
      }
    }
    Functions: {
      criar_negocio: {
        Args: {
          capacidade?: number
          horario_corte?: string
          modalidades?: Database["public"]["Enums"]["modalidade"][]
          nome: string
        }
        Returns: string
      }
    }
    Enums: {
      especie: "cao" | "gato"
      etapa_reserva:
        | "orcamento"
        | "confirmada"
        | "em_andamento"
        | "finalizada"
        | "cancelada"
      forma_pagamento: "pix" | "dinheiro"
      gravidade: "leve" | "moderada" | "grave"
      modalidade: "estadia" | "diaria" | "sessao" | "adicional"
      papel_membro: "dono" | "ajudante"
      porte: "pequeno" | "medio" | "grande"
      sexo: "macho" | "femea"
      situacao_espera: "aguardando" | "atendido" | "desistiu"
      tipo_cobranca: "integral" | "sinal" | "restante" | "avulsa"
      tipo_preco: "faixa" | "cao_extra" | "especial"
      tipo_tarefa: "refeicao" | "remedio" | "outra"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      especie: ["cao", "gato"],
      etapa_reserva: [
        "orcamento",
        "confirmada",
        "em_andamento",
        "finalizada",
        "cancelada",
      ],
      forma_pagamento: ["pix", "dinheiro"],
      gravidade: ["leve", "moderada", "grave"],
      modalidade: ["estadia", "diaria", "sessao", "adicional"],
      papel_membro: ["dono", "ajudante"],
      porte: ["pequeno", "medio", "grande"],
      sexo: ["macho", "femea"],
      situacao_espera: ["aguardando", "atendido", "desistiu"],
      tipo_cobranca: ["integral", "sinal", "restante", "avulsa"],
      tipo_preco: ["faixa", "cao_extra", "especial"],
      tipo_tarefa: ["refeicao", "remedio", "outra"],
    },
  },
} as const
