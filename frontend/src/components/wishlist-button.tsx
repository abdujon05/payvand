import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import useWishlist from "@/store/wishlist-store";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";

export function WishlistButton({ product }: { product: Product }) {
    const { addItem, removeItem, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleWishlist}
            className={cn(
                "transition-colors",
                isWishlisted && "bg-primary/10 text-primary hover:bg-primary/20"
            )}
        >
            <Heart
                className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-primary"
                )}
            />
        </Button>
    );
}