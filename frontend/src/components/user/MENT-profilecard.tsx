import bem from 'bero'
import {MENTButton} from "@/components/button/MENT-button.tsx";

const bemProfileCard = bem("MENT-profile-card");

// @ts-ignore
const ProfileCard = ({fullName, userName, profileImage, spokenLanguage, flag, bio, skills, onActionButtonClick}) => {
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

                    <MENTButton
                    className={bemProfileCard("left-action")}
                    variant="primary"
                    type="button"
                    isSmall
                    >
                        Connect
                    </MENTButton>
                </div>
            </div>
            <div className={bemProfileCard("right")}>
                <div className={bemProfileCard("right-info")}>
                    <div className={bemProfileCard("right-info__country")}>
                        <span className={bemProfileCard("right-info__country-image")} role="img" aria-label={spokenLanguage}>{flag}</span>
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
                    <ul className={bemProfileCard("right-info__skills-list")}>
                        {skills.map((skill: string, index: number) => (
                            <li key={index}> {skill} </li>
                        )).filter((_: null, index: number) => index < 15)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;