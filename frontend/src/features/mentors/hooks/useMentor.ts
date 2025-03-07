import { useState, useEffect, SetStateAction} from 'react';
import mentorService from '../services/mentorServices.ts';
import {mentor} from '../types/mentor';

export const useMentors = () => {
    const [mentors, setMentors] = useState<mentor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        mentorService.getMentors()
            .then((fetchedMentors) => {
                setMentors(fetchedMentors);
            })
            .catch((error: SetStateAction<string | null>) => {
                setError(error);
                console.log("Ein fehler ist aufgetreten: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { mentors, loading, error };
};