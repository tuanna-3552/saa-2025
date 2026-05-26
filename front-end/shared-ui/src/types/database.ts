export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      award_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          max_votes_per_voter: number
          name: string
          season_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          max_votes_per_voter?: number
          name: string
          season_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          max_votes_per_voter?: number
          name?: string
          season_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "award_categories_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      nominations: {
        Row: {
          category_id: string
          created_at: string
          id: string
          nominator_id: string
          nominee_id: string
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          season_id: string
          status: Database["public"]["Enums"]["nomination_status"]
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          nominator_id: string
          nominee_id: string
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          season_id: string
          status?: Database["public"]["Enums"]["nomination_status"]
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          nominator_id?: string
          nominee_id?: string
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          season_id?: string
          status?: Database["public"]["Enums"]["nomination_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nominations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "award_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominations_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominations_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department_id: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean
          last_logged_in: string | null
          level: number
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department_id?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean
          last_logged_in?: string | null
          level?: number
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department_id?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_logged_in?: string | null
          level?: number
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          announced_at: string
          announced_by: string | null
          category_id: string
          created_at: string
          id: string
          season_id: string
          vote_count: number
          winner_id: string
        }
        Insert: {
          announced_at?: string
          announced_by?: string | null
          category_id: string
          created_at?: string
          id?: string
          season_id: string
          vote_count?: number
          winner_id: string
        }
        Update: {
          announced_at?: string
          announced_by?: string | null
          category_id?: string
          created_at?: string
          id?: string
          season_id?: string
          vote_count?: number
          winner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_announced_by_fkey"
            columns: ["announced_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "award_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string
          id: string
          name: string
          nomination_end: string | null
          nomination_start: string | null
          status: Database["public"]["Enums"]["season_status"]
          updated_at: string
          voting_end: string | null
          voting_start: string | null
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          nomination_end?: string | null
          nomination_start?: string | null
          status?: Database["public"]["Enums"]["season_status"]
          updated_at?: string
          voting_end?: string | null
          voting_start?: string | null
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          nomination_end?: string | null
          nomination_start?: string | null
          status?: Database["public"]["Enums"]["season_status"]
          updated_at?: string
          voting_end?: string | null
          voting_start?: string | null
          year?: number
        }
        Relationships: []
      }
      votes: {
        Row: {
          category_id: string
          created_at: string
          id: string
          nominee_id: string
          season_id: string
          voter_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          nominee_id: string
          season_id: string
          voter_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          nominee_id?: string
          season_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "award_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      nomination_status: "pending" | "approved" | "rejected"
      season_status: "draft" | "nomination" | "voting" | "closed" | "announced"
      user_role: "admin" | "employee"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      nomination_status: ["pending", "approved", "rejected"],
      season_status: ["draft", "nomination", "voting", "closed", "announced"],
      user_role: ["admin", "employee"],
    },
  },
} as const

