import { useNavigate } from "react-router-dom";
import useWishlist from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export function WishlistSection() {
  const navigate = useNavigate();
  const { items, clearWishlist, removeItem } = useWishlist();

  return (
    <Card className="mt-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="wishlist">
          <AccordionTrigger className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">My Wishlist</span>
              <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                {items.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 pt-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Items you've saved for later
                </p>
                {items.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearWishlist}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              {items.length > 0 ? (
                <div className="grid gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="flex flex-1 items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium leading-none">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/products/${item.id}`)}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your wishlist is empty
                  </p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}