import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    ShoppingCart,
    Truck,
    RefreshCcw,
    CreditCard,
    UserCircle,
    Search,
    MessageSquare,
    Phone,
    Mail,
} from "lucide-react";

interface HelpCategory {
    icon: JSX.Element;
    title: string;
    description: string;
    link: string;
}

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState("");

    const categories: HelpCategory[] = [
        {
            icon: <ShoppingCart className="h-6 w-6" />,
            title: "Orders",
            description: "Track, modify, or cancel your orders",
            link: "/help/orders"
        },
        {
            icon: <Truck className="h-6 w-6" />,
            title: "Shipping",
            description: "Shipping methods, costs, and delivery times",
            link: "/help/shipping"
        },
        {
            icon: <RefreshCcw className="h-6 w-6" />,
            title: "Returns",
            description: "Return policy and process",
            link: "/help/returns"
        },
        {
            icon: <CreditCard className="h-6 w-6" />,
            title: "Payment",
            description: "Payment methods and billing information",
            link: "/help/payment"
        },
        {
            icon: <UserCircle className="h-6 w-6" />,
            title: "Account",
            description: "Manage your account settings",
            link: "/help/account"
        }
    ];

    const popularQuestions = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by visiting the Order Tracking page and entering your order number, which can be found in your confirmation email."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to certain products for hygiene reasons."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days delivery. International shipping times vary by location."
        }
    ];

    const contactMethods = [
        {
            icon: <MessageSquare className="h-5 w-5" />,
            title: "Live Chat",
            description: "Chat with our support team",
            action: "Start Chat"
        },
        {
            icon: <Phone className="h-5 w-5" />,
            title: "Phone Support",
            description: "+1 (555) 123-4567",
            action: "Call Now"
        },
        {
            icon: <Mail className="h-5 w-5" />,
            title: "Email",
            description: "support@payvand.com",
            action: "Send Email"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Help Center</h1>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                    Find answers to common questions or get in touch with our support team.
                </p>

                <div className="mx-auto max-w-2xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search help articles..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="mb-8 text-2xl font-semibold">Browse by Category</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <Link key={index} to={category.link}>
                            <Card className="transition-shadow hover:shadow-md">
                                <CardContent className="flex items-start gap-4 p-6">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{category.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Popular Questions</h2>
                <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {popularQuestions.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="mb-6 text-2xl font-semibold">Still Need Help?</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {contactMethods.map((method, index) => (
                        <Card key={index}>
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto mb-4 w-fit rounded-full bg-primary/10 p-3">
                                    {method.icon}
                                </div>
                                <h3 className="mb-2 font-semibold">{method.title}</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {method.description}
                                </p>
                                <Button variant="outline" className="w-full">
                                    {method.action}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}