import { useState, useEffect, SetStateAction} from 'react';
import mentorService from '../services/mentorServices.ts';
import {mentor} from '../types/mentor';
import { useMentorActions, useMentors as Mentor } from '../store/mentorSlice.ts';

export const useMentors = () => {
    const [mentors, setMentors] = useState<mentor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const mentor = Mentor()
    const { setMentorData } = useMentorActions();

    useEffect(() => {
        setLoading(true);
        mentorService.getMentors()
            .then((fetchedMentors) => {
                setMentors(fetchedMentors);
                setMentorData(fetchedMentors)
            })
            .catch((error: SetStateAction<string | null>) => {
                setError(error);
                console.log("Ein fehler ist aufgetreten: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setMentorData]);

    return { mentors, loading, error };
};