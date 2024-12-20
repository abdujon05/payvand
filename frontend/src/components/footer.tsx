import { Link } from "react-router-dom";
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

export default function Footer() {
    const contactInfo = [
        { icon: <Phone className="h-4 w-4" />, text: "+992 (37) 123-4567" },
        { icon: <Mail className="h-4 w-4" />, text: "support@payvand.tj" },
        { icon: <MapPin className="h-4 w-4" />, text: "ул. Рудаки 123, Душанбе, Таджикистан" },
    ];

    const quickLinks = [
        { text: "Products", href: "/products" },
        { text: "About Us", href: "/about" },
        { text: "Contact", href: "/contact" },
        { text: "FAQ", href: "/faq" },
    ];

    const customerService = [
        { text: "Track Order", href: "/orders" },
        { text: "Help Center", href: "/help" },
        { text: "Returns & Exchanges", href: "/returns" },
        { text: "Shipping Policy", href: "/shipping" },
    ];

    const socialLinks = [
        { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
        { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
        { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
        { icon: <Youtube className="h-5 w-5" />, href: "#", label: "Youtube" },
        { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto py-12 px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About Payvand</h3>
                        <p className="text-sm text-muted-foreground">
                            Your trusted source for quality products and exceptional service.
                        </p>
                        <div className="flex flex-col space-y-2">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <nav className="flex flex-col space-y-2 text-sm">
                            {quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
                        <nav className="flex flex-col space-y-2 text-sm">
                            {customerService.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
                        <div className="mb-4 flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="rounded-lg bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Follow us on social media for the latest updates, promotions, and more.
                        </p>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ~  Payvand. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}