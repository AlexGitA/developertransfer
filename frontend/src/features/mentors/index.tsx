// index.tsx (UserGallery)
import React, { useState } from 'react';
import { useMentors } from './hooks/useMentor.ts';
import ProfileCard from './components/MENT-profilecard.tsx';
import bem from 'bero';
import { Button } from '@/components/ui/button.tsx';
import { Skeleton } from '@/components/ui/skeleton';

const bemMentorList = bem("MENT-mentor-list");

const MentorList: React.FC = () => {
    const { mentors, loading, error } = useMentors();
    const [displayCount, setDisplayCount] = useState(5);

    if (error) {
        return (
            <div className={bemMentorList("error")}>
                Error loading mentors: {'Unknown error'}
            </div>
        );
    }

    return (
        <div className={bemMentorList()}>
            {loading ? (
                Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="w-full h-[200px] rounded-lg" />
                ))
            ) : (
                <>
                    {mentors.slice(0, displayCount).map((mentor) => (
                        <ProfileCard
                            key={mentor.id}
                            userId={mentor.id}
                            fullName={`${mentor.first_name} ${mentor.last_name}`}
                            userName={mentor.username}
                            profileImage={mentor.profile_picture}
                            spokenLanguage={mentor.country}
                            bio={mentor.bio}
                            skills={mentor.skills_info.slice(0, 7)}
                            more_skills={mentor.skills_info.length > 8}
                        />
                    ))}

                    {displayCount < mentors.length && (
                        <Button
                            onClick={() => setDisplayCount(prev => prev + 5)}
                            variant="ghost"
                            className="mt-4"
                        >
                            Load More ({mentors.length - displayCount} remaining)
                        </Button>
                    )}
                </>
            )}

            {!loading && mentors.length === 0 && (
                <div className={bemMentorList("no-mentors")}>
                    No mentors found matching your criteria
                </div>
            )}
        </div>
    );
};

export default MentorList;