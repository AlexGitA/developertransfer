import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import React, {useState} from "react";
import AxiosInstance from "@/lib/Axios"
import {useNavigate} from 'react-router-dom'


export function RegisterForm({className, ...props}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: ""
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
        console.log('Sending registration data:', {
            url: '/api/auth/register/',
            payload: formData,
        });

        try {
            const response = await AxiosInstance.post('/api/auth/register/', formData);

            if (response.data?.detail === "Verification e-mail sent.") {
                // Show success message and redirect
                setError(""); // Clear any existing errors
                navigate("/verify-email");
            }
        } catch (err: any) {
            console.error("Registration error:", err.response?.data || err.message);

            if (err.response?.data) {
                // Handle field-specific errors
                const errorData = err.response.data;

                // Handle username errors
                if (Array.isArray(errorData.username)) {
                    setFieldErrors(prev => ({
                        ...prev,
                        username: errorData.username[0]
                    }));
                }

                // Handle email errors
                if (Array.isArray(errorData.email)) {
                    setFieldErrors(prev => ({
                        ...prev,
                        email: errorData.email[0]
                    }));
                }

                // Handle password errors
                if (Array.isArray(errorData.password1)) {
                    setFieldErrors(prev => ({
                        ...prev,
                        password1: errorData.password1[0]
                    }));
                }
                if (Array.isArray(errorData.password2)) {
                    setFieldErrors(prev => ({
                        ...prev,
                        password2: errorData.password2[0]
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
                                <h1 className="text-2xl font-bold">Your journey starts here</h1>
                                <p className="text-balance text-muted-foreground">
                                    Register your MentorX account
                                </p>
                                {error && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="usernameX"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {fieldErrors.username && (
                                    <p className="text-sm text-red-500">{fieldErrors.username}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="email">Email</Label>
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="youremail@mentorx.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {fieldErrors.email && (
                                    <p className="text-sm text-red-500">{fieldErrors.email}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password1">Password</Label>
                                </div>
                                <Input
                                    id="password1"
                                    type="password"
                                    required
                                    value={formData.password1}
                                    onChange={handleChange}
                                />
                                {fieldErrors.password1 && (
                                    <p className="text-sm text-red-500">{fieldErrors.password1}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password2">Password Confirmation</Label>
                                </div>
                                <Input
                                    id="password2"
                                    type="password"
                                    required
                                    value={formData.password2}
                                    onChange={handleChange}
                                />
                                {fieldErrors.password2 && (
                                    <p className="text-sm text-red-500">{fieldErrors.password2}</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="text-white w-full"
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </Button>
                            <div
                                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Button variant="outline" className="bg-primary-200 w-full">
                                    <i className="fa-brands fa-apple text-lg hover:text-gray-700"></i>
                                    <span className="sr-only">Login with Apple</span>
                                </Button>
                                <Button variant="outline" className="bg-primary-200 w-full">
                                    <i className="fa-brands fa-google text-lg hover:text-gray-700"></i>
                                    <span className="sr-only">Login with Google</span>
                                </Button>
                                <Button variant="outline" className="bg-primary-200 w-full">
                                    <i className="fa-brands fa-meta text-lg hover:text-gray-700"></i>
                                    <span className="sr-only">Login with Meta</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="underline underline-offset-4 hover:text-primary">
                                    Log in
                                </a>
                            </div>
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