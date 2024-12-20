import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/products?category=${category.id}`}>
      <Card className="overflow-hidden transition-colors hover:bg-muted/50">
        <div className="aspect-[2/1] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}