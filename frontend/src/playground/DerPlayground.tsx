import MENTLoader from '@/components/SVGLoader/MENT-loader';
import ProfileCard from '@/components/user/MENT-profilecard.tsx'
import img from '@/assets/testprofile.jpg'

export default function DerPlayground() {
    return (
        <>
            <MENTLoader></MENTLoader>
            <div className="app__content">
                <ProfileCard
                    fullName="Sarah Johnson"
                    userName="sarah_dev"
                    profileImage={img}
                    spokenLanguage="English"
                    flag="🇺🇸"
                    bio="Senior software engineer with expertise in building scalable web applications. Passionate about open source and developer experience."
                    skills={['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Docker', 'Sucker' ]}
                    onActionButtonClick={() => console.log('Connect clicked')}
                />
            </div>
        </>
    );
}