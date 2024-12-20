import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitted(true);
            toast.success("Recovery email sent! Please check your inbox.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send recovery email. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto relative min-h-screen flex items-center justify-center">
            <div className="">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password Recovery</CardTitle>
                            <CardDescription>
                                {!isSubmitted
                                    ? "Enter your email address and we'll send you a link to reset your password"
                                    : "We've sent you an email with instructions"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                required
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading ? "Sending link..." : "Send Reset Link"}
                                    </Button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        We've sent a password reset link to your email address. Please check
                                        your inbox and follow the instructions to reset your password.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Didn't receive the email? Check your spam folder or{" "}
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-primary underline-offset-4 hover:underline"
                                        >
                                            try again
                                        </button>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <div className="w-full">
                                <Link
                                    to="/login"
                                    className="flex items-center text-sm text-muted-foreground hover:text-primary"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to login
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                    <div className="text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}