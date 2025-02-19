import MENTLoader from '@/components/SVGLoader/MENT-loader';
import MentorList from "@/features/mentors";

export default function DerPlayground() {
    return (
        <>
            <MENTLoader></MENTLoader>
            <div className="app__content">
                <MentorList />
            </div>
        </>
    );
}