import bem from 'bero'
import {Button} from '@/components/ui/button.tsx'
import CountryFlag from "@/components/ui/flag";
import SkillBadges from "@/pages/profile/components/SkillBadges.tsx";
import {useNavigate} from "react-router-dom";


const bemProfileCard = bem("MENT-profile-card");

// @ts-ignore
const ProfileCard = ({fullName, userName, profileImage, spokenLanguage, bio, skills, more_skills}) => {
    more_skills = Boolean(more_skills);
    const navigate = useNavigate();
    const handleButtonClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        navigate('/chats');
    };

    return (
        <div className={bemProfileCard()}>
            <div className={bemProfileCard("left")}>
                <img className={bemProfileCard("left-image")} src={profileImage}/>
                <div className={bemProfileCard("left-fullname")}>
                    <h2 className={bemProfileCard("left-fullname-text")}>
                        {fullName}
                    </h2>
                </div>
                <div className={bemProfileCard("left-username")}>
                    <span className={bemProfileCard("left-username-text")}>@{userName}</span>

                    <Button
                    className={bemProfileCard("left-action")}
                    variant="default"
                    type="button"
                    onClick={handleButtonClick}
                    >
                        Connect
                    </Button>
                </div>
            </div>
            <div className={bemProfileCard("right")}>
                <div className={bemProfileCard("right-info")}>
                    <div className={bemProfileCard("right-info__country")}>
                        <CountryFlag
                            code={spokenLanguage}
                            text={spokenLanguage}
                            label="Language"
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