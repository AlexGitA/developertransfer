import { MENTButton } from '@/components/button/MENT-button';
import { MENTInput } from '@/components/input/MENT-input';
import bem, {join} from "bero";
import React, { memo } from "react";
import useLogin from "@/features/auth/hooks/useLogin";

interface WrapperAttributes {
    className?: string;
    [key: string]: any;
}

interface LoginFormProps {
    className?: string;
    headline?: string;
    subtitle?: string;
    wrapperAttrs?: WrapperAttributes;
}

const bemLoginForm = bem("MENT-login-form");
const bemQuickLoingForm = bem("quick-login-form");

const LoginFormCore: React.FC<LoginFormProps> = ({
                                                               /**
                                                                * Core functional component for displaying Login form.
                                                                *
                                                                * @param {LoginFormProps} props - The props for the component.
                                                                * @param {string} [props.className] - Optional class for the root wrapper.
                                                                * @param {WrapperAttributes} [props.wrapperAttrs={}] - Additional attributes for the root wrapper element.
                                                                * @returns {JSX.Element} A JSX element representing the form notice.
                                                                */
                                                                className,
                                                                headline,
                                                                subtitle,
                                                                wrapperAttrs = {},
                                                           }) => {
    const { email, password, error, handleChange, handleSubmit } = useLogin();

    const renderQuickLoginForm = () => {
        return (
            <div className={bemQuickLoingForm()}>
                <div className={join(bemQuickLoingForm("barrier"), "form-item-distant")}>
                    <p className={bemQuickLoingForm("barrier-text")}>alternative</p>
                </div>
                <div className={bemQuickLoingForm("buttons")}>
                    <MENTButton
                        icon={"icon-arrow"}
                        hasChildren={false}
                        aria-label={'auth.login.google_button'}

                    >
                    </MENTButton>
                    <MENTButton
                        icon={"icon-arrow"}
                        hasChildren={false}
                        aria-label={'auth.login.facebook_button'}
                    >
                    </MENTButton>
                    <MENTButton
                        icon={"icon-arrow"}
                        hasChildren={false}
                        aria-label={'auth.login.github_button'}
                    >
                    </MENTButton>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        return (
            <form className={bemLoginForm("wrapper")} onSubmit={handleSubmit}>
                <fieldset>
                    <MENTInput
                        className={bemLoginForm("item")}
                        id="email"
                        labelText="Email"
                        value={email}
                        error = {error}
                        errorText="Invalid email address"
                        noIcon={false}
                        required={true}
                        onChange={handleChange}
                    />
                    <MENTInput
                        className={bemLoginForm("item")}
                        id="password"
                        type="password"
                        value={password}
                        labelText="Password"
                        password={true}
                        onChange={handleChange}
                        required={true}
                        hintText="Minimum 8 characters with mix of letters and numbers"
                    />
                    <div className={join(bemLoginForm("action-wrapper"),  "form-item-distant")}>
                        <MENTButton
                            className={bemLoginForm("action")}
                            variant="primary"
                            fullWidth
                            theme="light"
                            href={"forgot-password"}
                            aria-label={'auth.login.forgot_password_button'}
                        >
                            <p className={"forgot-password"}>Passwort vergessen?</p>

                        </MENTButton>
                        <MENTButton
                            className={bemLoginForm("action")}
                            variant="primary"
                            type="submit"
                            fullWidth
                            theme="light"
                            aria-label={'auth.login.submit_button'}
                        >
                            Anmelden
                        </MENTButton>
                        <button type="submit">submit</button>
                    </div>
                </fieldset>
            </form>
        );
    };

    return (
        <div className={bemLoginForm()}>
            <div className={bemLoginForm(className)}
                 {...wrapperAttrs}
            >
                <h1 className={join(bemLoginForm("headline"), "form-item-distant")}>{headline}</h1>
                <div className={join(bemLoginForm("subtitle"), "form-item-distant")}>
                    <p>{subtitle}</p>
                </div>
                {renderContent()}
                {renderQuickLoginForm()}
            </div>
        </div>
    );
};

export const LoginForm = memo(LoginFormCore);