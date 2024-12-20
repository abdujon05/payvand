import { Card, CardContent } from "@/components/ui/card";
import { Building2, Clock, Globe2, Truck } from "lucide-react";

export default function About() {
    const features = [
        {
            icon: <Globe2 className="h-6 w-6" />,
            title: "Global Reach",
            description: "Bringing quality products to customers worldwide with seamless international shipping and support."
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "24/7 Support",
            description: "Round-the-clock customer service to assist you with any questions or concerns."
        },
        {
            icon: <Truck className="h-6 w-6" />,
            title: "Fast Delivery",
            description: "Quick and reliable shipping with real-time tracking for all your orders."
        },
        {
            icon: <Building2 className="h-6 w-6" />,
            title: "Quality Assurance",
            description: "Rigorous quality control ensuring only the best products reach our customers."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">About Payvand</h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Connecting people with quality products through a seamless online shopping experience.
                </p>
            </div>

            <Card className="mb-16">
                <CardContent className="p-8 text-center">
                    <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground">
                        At Payvand, we're committed to revolutionizing online shopping by providing
                        a secure, user-friendly platform that connects customers with high-quality
                        products. Our focus is on creating lasting relationships with our customers
                        through exceptional service and reliability.
                    </p>
                </CardContent>
            </Card>

            <div className="mb-16">
                <h2 className="mb-8 text-center text-2xl font-semibold">Why Choose Payvand</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <CardContent className="flex flex-col items-center p-6 text-center">
                                <div className="mb-4 rounded-full bg-primary/10 p-3">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <h2 className="mb-8 text-2xl font-semibold">Our Team</h2>
                <Card>
                    <CardContent className="p-8">
                        <p className="mx-auto max-w-3xl text-muted-foreground">
                            Our dedicated team of professionals works tirelessly to ensure that
                            Payvand delivers the best possible experience to our customers. From
                            our customer service representatives to our technical experts, every
                            member of our team is committed to excellence.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}