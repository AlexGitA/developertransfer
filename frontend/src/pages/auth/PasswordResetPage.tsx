import {PasswordResetForm} from "@/components/form/password-reset-form.tsx";

export default function PasswordResetPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <img
                src="/images/hands.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover -z-10 dark:brightness-[0.2]"
            />
            <div className="w-full max-w-sm md:max-w-3xl">
                <PasswordResetForm/>
            </div>
        </div>
    )
}
