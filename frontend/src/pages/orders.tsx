import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface OrderStatus {
    status: "processing" | "shipped" | "delivered" | "delayed";
    date: string;
    location: string;
    description: string;
}

export default function TrackOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const [orderFound, setOrderFound] = useState(false);
    const { orderId } = useParams();

    const orderStatuses: OrderStatus[] = [
        {
            status: "delivered",
            date: "Dec 15, 2024",
            location: "New York, NY",
            description: "Package delivered to recipient",
        },
        {
            status: "shipped",
            date: "Dec 14, 2024",
            location: "Brooklyn, NY",
            description: "Out for delivery with courier",
        },
        {
            status: "shipped",
            date: "Dec 13, 2024",
            location: "Newark, NJ",
            description: "Arrived at local facility",
        },
        {
            status: "processing",
            date: "Dec 12, 2024",
            location: "Chicago, IL",
            description: "Package departed shipping facility",
        },
    ];

    const handleTrackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        toast.info('This feature is under development and will be added soon.');
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setOrderFound(true);
        setIsLoading(false);
    }

    const getStatusIcon = (status: OrderStatus["status"]) => {
        switch (status) {
            case "processing":
                return <Clock className="h-5 w-5 text-blue-500" />;
            case "shipped":
                return <Truck className="h-5 w-5 text-yellow-500" />;
            case "delivered":
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case "delayed":
                return <AlertCircle className="h-5 w-5 text-red-500" />;
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Track Your Order</h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Enter your order number to track your package and see delivery updates.
                </p>
            </div>

            <div className="mx-auto max-w-2xl">
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleTrackOrder} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="orderNumber">Order Number</Label>
                                <Input
                                    id="orderNumber"
                                    placeholder="Enter your order number (e.g., ORD-123456)"
                                    defaultValue={orderId}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Searching..." : "Track Order"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {orderFound && (
                    <div className="mt-8 space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">Order {orderId}</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Expected delivery: December 16, 2024
                                        </p>
                                    </div>
                                    <Package className="h-6 w-6 text-primary" />
                                </div>

                                <div className="space-y-4">
                                    {orderStatuses.map((status, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 border-l-2 border-primary/20 pl-4"
                                        >
                                            <div className="mt-0.5">{getStatusIcon(status.status)}</div>
                                            <div>
                                                <p className="font-medium">{status.description}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {status.location} • {status.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="details">
                                <AccordionTrigger>Order Details</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium">Shipping Address</h3>
                                            <p className="text-sm text-muted-foreground">
                                                John Doe<br />
                                                123 Main St<br />
                                                New York, NY 10001
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Items</h3>
                                            <ul className="text-sm text-muted-foreground">
                                                <li>1x Premium Wireless Headphones</li>
                                                <li>2x USB-C Charging Cable</li>
                                            </ul>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    );
}