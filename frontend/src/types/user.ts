// types/user.ts --> Representation of Django UserDetails model

export type LanguageChoice = 'en' | 'es' | 'fr' | 'de' | 'zh';

// Main UserDetails interface matching Django model
export interface UserDetails {
  id: number;

  // Fields from the OG User model

  username: string;
  email: string;
  first_name: string;
  last_name: string;

  // Status fields
  is_online: boolean;
  last_time_online: string | null;
  is_verified: boolean;

  // Personal information
  date_of_birth: string | null;
  preferred_language: LanguageChoice | null;
  country: string | null;
  bio: string | null;
  current_role: string | null;
  profile_progress: number | null;

  // Skill levels
  skill_level: number | null;
  analytical_level: number | null;
  startup_corporate_level: number | null;

  // Profile media
  profile_picture: string;

  // Social profiles
  github_profile: string | null;
  instagram_profile: string | null;
  linkedin_profile: string | null;

  // Mentorship status
  looking_for_mentor: boolean;
  mentor: boolean;

  // Additional information
  goals: string | null;
  likes: number;
  has_liked?: boolean;
  likes_count: number;
  // Skills of the user
  skills: number[];         // Array of IDs for write operations
  skills_info: {
    id: number;
    name: string;
    skill_type: string;
    type_display: string;
  }[];
}