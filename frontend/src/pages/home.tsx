import { categories } from "@/lib/data/categories";
import { ProductGrid } from "@/components/product/product-grid";
import { CategoryCard } from "@/components/ui/category-card";
import useProductStore from "@/store/product-store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
            alt="Payvand Tech"
            className="h-[500px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50">
            <div className="container flex h-full items-center">
              <div className="max-w-xl px-10">
                <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1">
                  <span className="text-sm font-medium">Welcome to Payvand 🔗</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Connect With Innovation
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Your trusted destination for premium tech and gadgets. Discover quality products
                  that bring innovation to your everyday life.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
                    Trusted by 10,000+ customers
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
                    Premium Quality
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
                    Secure Shopping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Shop by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Featured Products</h2>
          <ProductGrid products={products.slice(8, 12)} />
        </div>
      </section>
    </div>
  );
}