import React from 'react';
import { useMentors } from './hooks/useMentor.ts';
import ProfileCard from './components/MENT-profilecard.tsx';
import bem from 'bero';

const bemMentorList = bem("MENT-mentor-list");

const MentorList: React.FC = () => {
    const { mentors, loading, error } = useMentors();

    if (loading) {
        return <div className={bemMentorList("loading")}>Loading mentors...</div>;
    }

    if (error) {
        return <div className={bemMentorList("error")}>Error loading mentors: {error || error}</div>;
    }

    return (
        <div className={bemMentorList()}>
            {mentors.map((mentor) => (
                <ProfileCard
                    key={mentor.id}
                    fullName={mentor.first_name + " " + mentor.last_name}
                    userName={mentor.username}
                    profileImage={mentor.profile_picture}
                    spokenLanguage={mentor.country}
                    flag={mentor.country}
                    bio={mentor.bio}
                    skills={[]}
                    onActionButtonClick={() => { }}
                />
            ))}
            {mentors.length === 0 && !loading && !error && (
                <div className={bemMentorList("no-mentors")}>No mentors found.</div>
            )}
        </div>
    );
};

export default MentorList;