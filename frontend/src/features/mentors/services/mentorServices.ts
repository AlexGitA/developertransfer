import * as mentorAPI from "./mentorAPI.ts";
import {mentor} from "../types/mentor.ts"

interface User extends mentor {
    is_online	: boolean,
    preferred_language: string,
    current_role : string,
    skill_level	: number,
    analytical_level	: number,
    startup_corporate_level	: number,
    github_profile	: string,
    instagram_profile	: string,
    linkedin_profile	: string,
    looking_for_mentor	: boolean,
    mentor: boolean,
    skills : number[]
}

const mentorService = {

    getMentors: async () => {
        try {
            const response = await mentorAPI.getMentors();

            if (!response) {
                throw new Error("Ein Fehler ist beim Laden von Mentoren aufgetreten");
            }

            const allUsers : User[] = response.data;

            const mentors : mentor[] = allUsers.filter((user) =>
                typeof user.mentor === 'boolean' &&
                user.mentor === true
            );

            return mentors;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
}

export default mentorService;