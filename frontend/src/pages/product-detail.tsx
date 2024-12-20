import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import useProductStore from "@/store/product-store";
import { WishlistButton } from "@/components/wishlist-button";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { selectedProduct, loading, fetchProductById } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!selectedProduct) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, quantity });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="ml-2 font-medium">{selectedProduct.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({selectedProduct.reviews} reviews)
            </span>
          </div>
          <p className="mt-4 text-muted-foreground">{selectedProduct.description}</p>
        </div>

        <div>
          <p className="text-3xl font-bold">{formatPrice(selectedProduct.price)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Stock: {selectedProduct.stock} units
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-lg font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
              disabled={quantity >= selectedProduct.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={selectedProduct.stock === 0}
            >
              Add to Cart
            </Button>
            <WishlistButton product={selectedProduct} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Additional information</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Category</span>
              <span className="capitalize text-muted-foreground">
                {selectedProduct.category}
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Stock Status</span>
              <span
                className={selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"}
              >
                {selectedProduct.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}