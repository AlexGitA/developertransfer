import AxiosInstance from "@/lib/Axios";

// Skill interface matching your API schema
export interface Skill {
  id: number;
  name: string;
  skill_type: string;
  type_display?: string;
  created_at?: string;
}

// User details interface (simplified)
export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  skills_info: Skill[];
  // other fields would be here
}

// Service for handling skill-related API calls
class SkillsService {
  private skillsApiUrl = '/api/skills';
  private userDetailsApiUrl = '/api/user-details';

  // Get skills with search parameter (used by SkillSelector)
  async getSkills(searchTerm?: string): Promise<Skill[]> {
    const url = searchTerm ? `${this.skillsApiUrl}/?search=${searchTerm}` : this.skillsApiUrl;
    const response = await AxiosInstance.get(url);
    return response.data;
  }

  // Get current user details with skills info
  async getCurrentUserDetails(): Promise<UserDetails> {
    const response = await AxiosInstance.get(this.userDetailsApiUrl);
    return response.data;
  }

  // Update user skills (complete replacement)
  async updateUserSkills(skillIds: number[]): Promise<UserDetails> {
    const response = await AxiosInstance.patch(this.userDetailsApiUrl, {
      skills: skillIds
    });
    return response.data.data; // Access the data property of the response
  }
}

export default new SkillsService();