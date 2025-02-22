import bem from 'bero'
import {Button} from '@/components/ui/button.tsx'
import CountryFlag from "@/components/ui/flag";
import SkillBadges from "@/pages/profile/components/SkillBadges.tsx";


const bemProfileCard = bem("MENT-profile-card");

// @ts-ignore
const ProfileCard = ({fullName, userName, profileImage, spokenLanguage, bio, skills, more_skills}) => {
    more_skills = Boolean(more_skills);
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
                        <span className={bemProfileCard("right-info__country-language")}>{spokenLanguage}</span>
                    </div>
                    <p className={bemProfileCard("right-info__bio")}>
                        {bio}
                    </p>
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