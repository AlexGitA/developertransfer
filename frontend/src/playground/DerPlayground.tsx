import MENTLoader from '@/components/SVGLoader/MENT-loader';
import MentorList from "@/features/mentors";
import ProfileCard from '@/features/mentors/components/MENT-profilecard';
import testProfile from '@/assets/testprofile.jpg'

export default function DerPlayground() {
    return (
        <>
            <MENTLoader></MENTLoader>
            <div className="app__content">
                <MentorList />
                <ProfileCard
                userName={"save_dev"}
                fullName={" Dave Chaple"}
                profileImage={testProfile}
                spokenLanguage={"en"}
                flag={"en"}
                bio={"Ich hab meine stärken in Software Entwicklung"}
                skills={["c++", "c#", "java", "VSCode", "Visual Studio"]}
                onActionButtonClick={undefined}
                >

                </ProfileCard>
            </div>
        </>
    );
}