import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight } from "lucide-react";
import useAuthStore from "@/store/auth-store";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(7, "Password must be at least 7 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginForm) => {
        setIsLoading(true);
        try {
            const { email, password } = values;
            await login(email, password)
            toast.success("Account created successfully!");
            navigate('/profile');
        } catch (error) {
            console.error(error);
            toast.error("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted lg:flex">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2070&auto=format&fit=crop')`,
                        filter: 'brightness(0.9)'
                    }}
                />
                <div className="relative z-20 flex items-center justify-between p-8">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
                    >
                        <div className="rounded-full bg-primary/10 p-2">
                            🔗
                        </div>
                        Payvand
                    </Link>
                </div>
                <div className="relative z-20 mt-auto p-8">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "Join thousands of satisfied customers who have transformed their
                            online shopping experience with Payvand. Discover quality products,
                            exceptional service, and seamless transactions."
                        </p>
                        <footer className="text-sm">
                            <p className="font-semibold">Sofia Davis</p>
                            <p className="text-muted-foreground">Happy Customer</p>
                        </footer>
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4 text-sm">
                        <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span className="h-2 w-2 rounded-full bg-primary/60" />
                            <span className="h-2 w-2 rounded-full bg-primary/30" />
                        </div>
                        <p className="text-muted-foreground">Trusted by over 10,000 customers</p>
                    </div>
                </div>
            </div>

            <div className="relative lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            placeholder="name@example.com"
                                                            type="email"
                                                            className="pl-9"
                                                            autoComplete="email"
                                                            autoFocus
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between">
                                                    <FormLabel>Password</FormLabel>
                                                    <Link
                                                        to="/forgot-password"
                                                        className="text-sm text-muted-foreground hover:text-primary"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            className="pl-9"
                                                            autoComplete="current-password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>Signing in...</>
                                        ) : (
                                            <>
                                                Sign In
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}