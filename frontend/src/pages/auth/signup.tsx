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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";
import useAuthStore from "@/store/auth-store";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
    const { signup } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: false,
        },
    })

    const onSubmit = async (values: SignupForm) => {
        setIsLoading(true);
        try {
            const { email, password, name } = values;
            await signup(email, password, name)
            toast.success("Account created successfully!");
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>
                                Enter your details below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John Doe"
                                                            className="pl-9"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

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
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            className="pl-9"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        I agree to the Terms of Service and Privacy Policy
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <Button className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading ? "Creating account..." : "Create account"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative hidden h-full flex-col bg-muted lg:flex">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2070&auto=format&fit=crop')`,
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
        </div>
    )
}