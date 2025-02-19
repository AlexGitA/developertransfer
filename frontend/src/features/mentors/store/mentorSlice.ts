import { create } from 'zustand';
import { mentor } from '../types/mentor';


type MentorState = {
    readonly mentors: mentor[] | null;
};

type MentorActions = {
    readonly setMentorData: (mentors: mentor[]) => void;
    readonly clearMentorData: () => void;
};

type MentorStore = MentorState & {
    readonly actions: Readonly<MentorActions>;
};

const initialMentorState: MentorState = Object.freeze({
    mentors: null,
});

const createActions = (set: (update: (state: MentorState) => MentorState) => void) =>
    Object.freeze({
        setMentorData: (mentors: mentor[]) => {
            set((prev) => ({
                ...prev,
                mentors: Array.isArray(mentors) ? [...mentors] : null,
            }));
        },
        clearMentorData: () => {
            set((prev) => ({ ...prev, mentors: null }));
        },
    });

export const useMentorStore = create<MentorStore>((set) => {
    const state = { ...initialMentorState };
    const actions = createActions(set);

    return Object.freeze({
        ...state,
        actions,
    });
});

export const useMentors = () => useMentorStore((s) => s.mentors);
export const useMentorActions = () => useMentorStore((s) => s.actions);

export const mentorStore = useMentorStore;

export type { MentorState, MentorActions, MentorStore };