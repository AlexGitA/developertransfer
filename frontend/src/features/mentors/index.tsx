import React, {useState} from 'react';
import { useMentors } from './hooks/useMentor.ts';
import ProfileCard from './components/MENT-profilecard.tsx';
import bem from 'bero';
import {Button} from '@/components/ui/button.tsx'
import {useNavigate} from "react-router-dom";

const bemMentorList = bem("MENT-mentor-list");

const MentorList: React.FC = () => {
    const { mentors, loading, error } = useMentors();
    const [displayCount, setDisplayCount] = useState(5);
    const navigate = useNavigate();


    if (loading) {
        return <div className={bemMentorList("loading")}>Loading mentors...</div>;
    }

    if (error) {
        return <div className={bemMentorList("error")}>Error loading mentors: {error || error}</div>;
    }

    return (
        <div className={bemMentorList()}>
            {mentors.slice(0,displayCount).map((mentor) => (
                <div key={mentor.id} onClick={ () => navigate(`/profile/${mentor.id}`)}>
                    <ProfileCard
                        key={mentor.id}
                        fullName={mentor.first_name + " " + mentor.last_name}
                        userName={mentor.username}
                        profileImage={mentor.profile_picture}
                        spokenLanguage={mentor.country}
                        bio={mentor.bio}
                        skills={mentor.skills_info.slice(0, 7)}
                        more_skills={mentor.skills_info.length > 8}
                    />
                </div>
            ))}
            {displayCount < mentors.length && (
                <Button
                    onClick={() => setDisplayCount(prev => prev + 5)}
                    aria-label="Load more"
                    variant={"link"}
                >
                    Load More (Showing {displayCount} of {mentors.length})
                </Button>
            )}
            {mentors.length === 0 && !loading && !error && (
                <div className={bemMentorList("no-mentors")}>No mentors found.</div>
            )}
        </div>
    );
};

export default MentorList;