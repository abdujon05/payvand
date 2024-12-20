import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, Globe2 } from "lucide-react";

export default function ShippingPolicy() {
    const shippingMethods = [
        {
            icon: <Truck className="h-5 w-5" />,
            title: "Standard Shipping",
            duration: "5-7 business days",
            cost: "Free for orders over $50",
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: "Express Shipping",
            duration: "2-3 business days",
            cost: "$15.00",
        },
        {
            icon: <Globe2 className="h-5 w-5" />,
            title: "International Shipping",
            duration: "7-14 business days",
            cost: "Calculated at checkout",
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Shipping Policy</h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Learn about our shipping methods, delivery times, and costs
                </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {shippingMethods.map((method, index) => (
                        <Card key={index}>
                            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                                <div className="rounded-full bg-primary/10 p-3">
                                    {method.icon}
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">{method.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Duration: {method.duration}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Cost: {method.cost}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-medium">Order Processing</h3>
                                <p className="text-muted-foreground">
                                    Orders are processed within 1-2 business days after payment confirmation.
                                    You'll receive a shipping confirmation email with tracking information
                                    once your order is dispatched.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Delivery Areas</h3>
                                <p className="text-muted-foreground">
                                    We ship to most countries worldwide. Delivery times may vary depending
                                    on your location and chosen shipping method. International orders may
                                    be subject to customs duties and taxes.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Tracking Your Order</h3>
                                <p className="text-muted-foreground">
                                    Once your order ships, you'll receive a tracking number via email.
                                    You can also track your order by logging into your account and
                                    viewing your order history.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Shipping Restrictions</h3>
                                <p className="text-muted-foreground">
                                    Some products may have shipping restrictions to certain countries
                                    due to local regulations. We'll notify you if any items in your
                                    order cannot be shipped to your location.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}