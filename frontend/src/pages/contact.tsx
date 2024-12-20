import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactInfo {
    icon: JSX.Element;
    title: string;
    details: string;
    description: string;
}

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo: ContactInfo[] = [
        {
            icon: <Phone className="h-5 w-5" />,
            title: "Phone",
            details: "+992 (37) 123-4567",
            description: "Monday to Friday, 9am to 6pm"
        },
        {
            icon: <Mail className="h-5 w-5" />,
            title: "Email",
            details: "support@payvand.tj",
            description: "We'll respond within 24 hours"
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            title: "Address",
            details: "ул. Рудаки 123",
            description: "Душанбе, Таджикистан"
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: "Hours",
            details: "Пн-Пт: 9:00 - 18:00",
            description: "Сб-Вс: Выходной"
        }
    ];


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Message sent successfully!");
            (event.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact Us</h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <div className="grid gap-6">
                        {contactInfo.map((info, index) => (
                            <Card key={index}>
                                <CardContent className="flex items-start gap-4 p-6">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{info.title}</h3>
                                        <p className="mt-1 font-medium">{info.details}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {info.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            required
                                            name="firstName"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            required
                                            name="lastName"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        name="email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="How can we help you?"
                                        required
                                        name="subject"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your inquiry..."
                                        className="min-h-[150px]"
                                        required
                                        name="message"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}