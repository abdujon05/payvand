import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Package, Timer, Ban } from "lucide-react";

export default function Returns() {
    const returnSteps = [
        {
            icon: <Package className="h-5 w-5" />,
            title: "Initiate Return",
            description: "Login to your account and select the items you wish to return"
        },
        {
            icon: <Timer className="h-5 w-5" />,
            title: "Print Label",
            description: "Print the prepaid return shipping label"
        },
        {
            icon: <RefreshCw className="h-5 w-5" />,
            title: "Ship Items",
            description: "Package items securely and drop off at any carrier location"
        }
    ];

    const nonReturnableItems = [
        "Personalized items",
        "Intimate apparel",
        "Opened beauty products",
        "Digital downloads",
        "Gift cards"
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Returns & Exchanges</h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Easy returns within 30 days of delivery
                </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-8">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">Return Process</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {returnSteps.map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="mx-auto mb-4 w-fit rounded-full bg-primary/10 p-3">
                                        {step.icon}
                                    </div>
                                    <h3 className="mb-2 font-medium">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Return Policy</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-medium">Eligibility</h3>
                                <p className="text-muted-foreground">
                                    Items must be unused, in original packaging, and returned within
                                    30 days of delivery. All tags and labels must be attached.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Refund Process</h3>
                                <p className="text-muted-foreground">
                                    Refunds will be issued to the original payment method within
                                    5-7 business days after we receive and inspect the return.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Exchange Process</h3>
                                <p className="text-muted-foreground">
                                    For exchanges, please return the original item and place a new
                                    order. This ensures faster processing of your exchange.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 flex items-center gap-2 font-medium">
                                    <Ban className="h-5 w-5" />
                                    Non-Returnable Items
                                </h3>
                                <ul className="list-inside list-disc text-muted-foreground">
                                    {nonReturnableItems.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Damaged or Defective Items</h3>
                                <p className="text-muted-foreground">
                                    If you receive a damaged or defective item, please contact our
                                    customer service within 48 hours of delivery. We'll provide a
                                    prepaid return label and process a replacement or refund.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}