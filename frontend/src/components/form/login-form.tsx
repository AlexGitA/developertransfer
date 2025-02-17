import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import React, {useState} from "react";
import AxiosInstance from "@/lib/Axios"
import {useNavigate} from 'react-router-dom'

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Login request
            const loginResponse = await AxiosInstance.post('/api/auth/login/', formData);

            if (loginResponse.data.key) {
                const token = loginResponse.data.key;
                localStorage.setItem('access_token', token);

                // Get user data with token in header
                const userResponse = await AxiosInstance.get('/api/auth/user/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                if (userResponse.data) {
                    localStorage.setItem('user', JSON.stringify(userResponse.data));
                    navigate("/");
                }
            }
        } catch (err: any) {
            console.error("Login error:", err.response?.data || err.message);
            setError(
                err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.detail ||
                "Failed to login. Please check your credentials."
            );
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
                                <h1 className="text-2xl font-bold">Welcome</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your MentorX account
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
                                    placeholder="username"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="text-white w-full"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
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
                                Don&apos;t have an account?{" "}
                                <a href={`/register/`} className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>

                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href={`/tos/`}>Terms of Service</a>{" "}
                and <a href={`/pp/`}>Privacy Policy</a>.
            </div>
        </div>
    )
}