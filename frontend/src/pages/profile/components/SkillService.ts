import AxiosInstance from "@/lib/Axios";

// Skill interface matching your API schema
export interface Skill {
  id: number;
  name: string;
  skill_type: string;
  type_display?: string;
  created_at?: string;
}

// Skill creation interface
export interface SkillCreate {
  name: string;
  skill_type: string;
}

// Service for handling skill-related API calls
class SkillsService {
  private apiUrl = '/api/skills';

  // Get all skills (with optional search parameter)
  async getSkills(searchTerm?: string): Promise<Skill[]> {
    const url = searchTerm ? `${this.apiUrl}/?search=${searchTerm}` : this.apiUrl;
    const response = await AxiosInstance.get(url);
    return response.data;
  }

  // Get a single skill by ID
  async getSkill(id: number): Promise<Skill> {
    const response = await AxiosInstance.get(`${this.apiUrl}/${id}/`);
    return response.data;
  }

  // Create a new skill
  async createSkill(skillData: SkillCreate): Promise<Skill> {
    const response = await AxiosInstance.post(this.apiUrl + '/', skillData);
    return response.data;
  }

  // Update a skill (full update)
  async updateSkill(id: number, skillData: SkillCreate): Promise<Skill> {
    const response = await AxiosInstance.put(`${this.apiUrl}/${id}/`, skillData);
    return response.data;
  }

  // Partially update a skill
  async partialUpdateSkill(id: number, skillData: Partial<SkillCreate>): Promise<Skill> {
    const response = await AxiosInstance.patch(`${this.apiUrl}/${id}/`, skillData);
    return response.data;
  }

  // Delete a skill
  async deleteSkill(id: number): Promise<void> {
    await AxiosInstance.delete(`${this.apiUrl}/${id}/`);
  }

  // Utility method to add a skill to user profile
  // This is for convenience - the actual update happens through UserDetailsUpdateSerializer
  async addSkillToProfile(userId: number, skillId: number): Promise<void> {
    // First get the current user details
    const response = await AxiosInstance.get(`/api/user-update/${userId}/`);
    const userData = response.data;

    // Add the skill ID if it's not already in the skills array
    if (!userData.skills.includes(skillId)) {
      const updatedSkills = [...userData.skills, skillId];

      // Use PATCH to update only the skills field
      await AxiosInstance.patch(`/api/user-update/${userId}/`, {
        skills: updatedSkills
      });
    }
  }

  // Utility method to remove a skill from user profile
  async removeSkillFromProfile(userId: number, skillId: number): Promise<void> {
    // First get the current user details
    const response = await AxiosInstance.get(`/api/user-update/${userId}/`);
    const userData = response.data;

    // Remove the skill ID from the skills array
    const updatedSkills = userData.skills.filter((id: number) => id !== skillId);

    // Use PATCH to update only the skills field
    await AxiosInstance.patch(`/api/user-update/${userId}/`, {
      skills: updatedSkills
    });
  }
}

export default new SkillsService();