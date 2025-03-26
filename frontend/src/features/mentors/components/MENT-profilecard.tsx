import { useState, useEffect } from 'react';
import bem from 'bero';
import { Button } from '@/components/ui/button.tsx';
import CountryFlag from "@/components/ui/flag";
import SkillBadges from "@/pages/profile/components/SkillBadges.tsx";
import { useNavigate } from "react-router-dom";
import { FriendshipService } from '../services/friendshipService';
import { getUserId } from '@/lib/Axios';
import { Loader2 } from 'lucide-react';

const bemProfileCard = bem("MENT-profile-card");

interface ProfileCardProps {
    fullName: string;
    userName: string;
    profileImage: string;
    spokenLanguage: string;
    bio?: string;
    skills: string[];
    more_skills: boolean;
    userId: number;
}

const ProfileCard = ({
                         fullName,
                         userName,
                         profileImage,
                         spokenLanguage,
                         bio,
                         skills,
                         more_skills,
                         userId
                     }: ProfileCardProps) => {
    const navigate = useNavigate();
    const [friendStatus, setFriendStatus] = useState<'not_friends' | 'request_sent' | 'friends'>('not_friends');
    const [isLoading, setIsLoading] = useState(false);
    const currentUserId = getUserId();

    useEffect(() => {
        const checkFriendStatus = async () => {
            if (!currentUserId || userId === currentUserId) return;

            try {
                const { status } = await FriendshipService.getFriendStatus(userId);
                setFriendStatus(status);
            } catch (error) {
                setFriendStatus('not_friends');
            }
        };

        checkFriendStatus();
    }, [userId, currentUserId]);

    const handleProfileClick = () => {
        navigate(`/profile/${userId}`);
    };


    const handleFriendAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!currentUserId) return navigate('/login');

        setIsLoading(true);
        try {
            // Change from userName to userId
            await FriendshipService.sendFriendRequest(userId);
            setFriendStatus('request_sent');
        } catch (error) {
            console.error('Friend request failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const isCurrentUser = userId === currentUserId;
    const buttonText = {
        not_friends: 'Connect',
        request_sent: 'Request Sent',
        friends: 'Connected'
    }[friendStatus];

    return (
        <div className={bemProfileCard()}
             onClick={handleProfileClick}
             role="button"
             tabIndex={0}
             style={{ cursor: 'pointer' }}>
            <div className={bemProfileCard("left")}>
                <img className={bemProfileCard("left-image")} src={profileImage} alt={fullName} />
                <div className={bemProfileCard("left-fullname")}>
                    <h2 className={bemProfileCard("left-fullname-text")}>
                        {fullName}
                    </h2>
                </div>
                <div className={bemProfileCard("left-username")}>
                    <span className={bemProfileCard("left-username-text")}>@{userName}</span>

                    {!isCurrentUser && (
                        <Button
                            variant={friendStatus === 'request_sent' ? 'secondary' : 'default'}
                            onClick={handleFriendAction}
                            disabled={isLoading || friendStatus !== 'not_friends'}
                            className={bemProfileCard("connect-button")}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : buttonText}
                        </Button>
                    )}
                </div>
            </div>
            <div className={bemProfileCard("right")}>
                <div className={bemProfileCard("right-info")}>
                    <div className={bemProfileCard("right-info__country")}>
                        <CountryFlag
                            code={spokenLanguage}
                            text={spokenLanguage}
                            label="Country"
                            showText={false}
                        />
                    </div>
                    {bio ? (
                            <p className={bemProfileCard("right-info__bio")}>
                                {bio.length > 221 ? `${bio.slice(0, 221)}...` : bio}
                            </p>
                        ) :
                        <p className={bemProfileCard("right-info__bio")}>
                            Im new here! Let's connect!
                        </p>
                    }
                </div>
                <div className={bemProfileCard("right-info__skills")}>
                    <h3 className={bemProfileCard("right-info__skills-text")}>
                        Skills
                    </h3>
                    <div className={bemProfileCard("right-info__skills-list")}>
                        <SkillBadges skills={skills} more_skills={more_skills} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;