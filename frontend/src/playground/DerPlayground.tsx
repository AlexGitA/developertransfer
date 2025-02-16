import MENTLoader from '@/components/SVGLoader/MENT-loader';
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm.tsx";
import Header from '@/layout/Header/Header';

export default function DerPlayground() {
    return (
        <>
            <Header></Header>
            <MENTLoader></MENTLoader>
            <div className={"left-hand"}>
                <svg>
                    <use href={"#left-hand"}></use>
                </svg>
            </div>
            <LoginForm
                className={"client"}
                headline={"Logge dich ein!"}
                subtitle={"When you create an account, you agree to our Terms of use. Learn how we handle your data in our Privacy notice."}
            >
            </LoginForm>
            <div className={"right-hand"}>
                <svg>
                    <use href={"#right-hand"}></use>
                </svg>
            </div>
        </>
    );
}