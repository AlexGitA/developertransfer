// todo finish the form
import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import React, {useState} from "react";
import AxiosInstance from "@/lib/Axios"
import {useNavigate} from 'react-router-dom'


export function PasswordResetForm({className, ...props}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        new_password1: "",
        new_password2: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear field-specific error when user starts typing
        if (fieldErrors[id]) {
            setFieldErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});
        setLoading(true);

        // Log the form data being sent
        console.log('Sending password reset data:', {
            url: '/api/auth/register/',
            payload: formData,
        });

        try {
            const response = await AxiosInstance.post('/api/auth/register/', formData);

            if (response.data?.detail === "Reset e-mail sent.") {
                // Show success message and redirect
                setError(""); // Clear any existing errors
                navigate("/verify-email");
            }
        } catch (err: any) {
            console.error("Reset error:", err.response?.data || err.message);

            if (err.response?.data) {
                // Handle field-specific errors
                const errorData = err.response.data;




                // Handle password errors
                if (Array.isArray(errorData.new_password1)) {
                    setFieldErrors(prev => ({
                        ...prev,
                        new_password1: errorData.new_password1[0]
                    }));
                }
                if (Array.isArray(errorData.new_password2)) {
                    setFieldErrors(prev => ({
                        ...prev,
                        new_password2: errorData.new_password2[0]
                    }));
                }

                // Handle non-field errors
                if (Array.isArray(errorData.non_field_errors)) {
                    setError(errorData.non_field_errors[0]);
                }
            } else {
                // Handle generic error
                setError("Registration failed. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-1">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Password Change</h1>
                                <p className="text-balance text-muted-foreground">
                                    Enter your new MentorX password
                                </p>
                                {error && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="new_password1">Password</Label>
                                </div>
                                <Input
                                    id="new_password1"
                                    type="password"
                                    required
                                    value={formData.new_password1}
                                    onChange={handleChange}
                                />
                                {fieldErrors.new_password1 && (
                                    <p className="text-sm text-red-500">{fieldErrors.new_password1}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="new_password2">Password Confirmation</Label>
                                </div>
                                <Input
                                    id="new_password2"
                                    type="password"
                                    required
                                    value={formData.new_password2}
                                    onChange={handleChange}
                                />
                                {fieldErrors.new_password2 && (
                                    <p className="text-sm text-red-500">{fieldErrors.new_password2}</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="text-white w-full"
                                disabled={loading}
                            >
                                {loading ? "Changing..." : "Change"}
                            </Button>


                        </div>
                    </form>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="/tos">Terms of Service</a>{" "}
                and <a href="/pp">Privacy Policy</a>.
            </div>
        </div>
    )
}