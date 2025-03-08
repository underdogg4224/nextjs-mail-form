export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      action_steps: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: string
          priority: number
          is_completed: boolean
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category: string
          priority: number
          is_completed?: boolean
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          category?: string
          priority?: number
          is_completed?: boolean
          created_at?: string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "action_steps_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      educational_content: {
        Row: {
          id: string
          title: string
          description: string
          content_type: string
          url: string
          target_mindset: string
          category: string
          priority: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content_type: string
          url: string
          target_mindset: string
          category: string
          priority: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content_type?: string
          url?: string
          target_mindset?: string
          category?: string
          priority?: number
          created_at?: string
        }
        Relationships: []
      }
      progress_tracking: {
        Row: {
          id: string
          user_id: string
          metric_name: string
          metric_value: number
          recorded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          metric_name: string
          metric_value: number
          recorded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          metric_name?: string
          metric_value?: number
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_tracking_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quiz_responses: {
        Row: {
          id: string
          user_id: string
          responses: Json
          creator_score: number
          mindset_type: string
          insights: string[]
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          responses: Json
          creator_score: number
          mindset_type: string
          insights: string[]
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          responses?: Json
          creator_score?: number
          mindset_type?: string
          insights?: string[]
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          creator_score: number | null
          mindset_type: string | null
          trauma_type: string | null
          primary_blocker: string | null
          last_quiz_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          creator_score?: number | null
          mindset_type?: string | null
          trauma_type?: string | null
          primary_blocker?: string | null
          last_quiz_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          creator_score?: number | null
          mindset_type?: string | null
          trauma_type?: string | null
          primary_blocker?: string | null
          last_quiz_date?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for common database operations
export type User = Database['public']['Tables']['users']['Row']
export type NewUser = Database['public']['Tables']['users']['Insert']
export type UpdateUser = Database['public']['Tables']['users']['Update']

export type QuizResponse = Database['public']['Tables']['quiz_responses']['Row']
export type NewQuizResponse = Database['public']['Tables']['quiz_responses']['Insert']

export type ActionStep = Database['public']['Tables']['action_steps']['Row']
export type NewActionStep = Database['public']['Tables']['action_steps']['Insert']
export type UpdateActionStep = Database['public']['Tables']['action_steps']['Update']

export type ProgressTracking = Database['public']['Tables']['progress_tracking']['Row']
export type NewProgressTracking = Database['public']['Tables']['progress_tracking']['Insert']

export type EducationalContent = Database['public']['Tables']['educational_content']['Row']