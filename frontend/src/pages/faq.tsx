import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export default function FAQ() {
    const faqs = {
        "Shopping & Orders": [
            {
                question: "How do I place an order?",
                answer: "Browse our products, add items to your cart, and proceed to checkout. Follow the simple steps to provide shipping and payment information to complete your purchase."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay for secure and convenient transactions."
            },
            {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history."
            }
        ],
        "Shipping & Delivery": [
            {
                question: "What are your shipping options?",
                answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and next-day delivery options. Shipping costs vary based on location and selected method."
            },
            {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping times and costs vary by destination. Please check our shipping calculator at checkout for specific details."
            },
            {
                question: "How long will it take to receive my order?",
                answer: "Domestic orders typically arrive within 5-7 business days with standard shipping. International orders may take 7-14 business days depending on the destination and customs processing."
            }
        ],
        "Returns & Refunds": [
            {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some restrictions apply to certain products for hygiene reasons."
            },
            {
                question: "How do I initiate a return?",
                answer: "Log into your account, go to your orders, and select 'Return Item' next to the relevant product. Follow the prompts to generate a return label and instructions."
            },
            {
                question: "When will I receive my refund?",
                answer: "Refunds are processed within 3-5 business days after we receive your return. The funds may take an additional 2-5 business days to appear in your account depending on your bank."
            }
        ],
        "Account & Security": [
            {
                question: "How do I create an account?",
                answer: "Click the 'Sign Up' button in the top right corner of our website. Enter your email address and create a password. You can also sign up using your Google or Facebook account."
            },
            {
                question: "How can I reset my password?",
                answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to create a new password."
            },
            {
                question: "Is my personal information secure?",
                answer: "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never store sensitive payment details on our servers."
            }
        ],
        "Product Information": [
            {
                question: "How can I find product specifications?",
                answer: "Detailed product specifications are listed on each product page under the 'Specifications' tab. You can also find dimensions, materials, and care instructions there."
            },
            {
                question: "Are your products authentic?",
                answer: "Yes, all products sold on Payvand are 100% authentic. We work directly with manufacturers and authorized distributors to ensure product authenticity."
            },
            {
                question: "What if a product is out of stock?",
                answer: "You can sign up for email notifications on the product page to be alerted when the item is back in stock. We regularly restock popular items."
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">
                    Frequently Asked Questions
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Find answers to common questions about shopping with Payvand. Can't find what you're looking for? Contact our support team.
                </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-8">
                {Object.entries(faqs).map(([category, questions], index) => (
                    <Card key={index} className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">{category}</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {questions.map((faq, faqIndex) => (
                                <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                ))}
            </div>
        </div>
    );
}