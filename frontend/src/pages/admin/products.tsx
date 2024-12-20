import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useProductStore from "@/store/product-store";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";
import { ProductFormDialog } from "@/components/admin/product-form";
import { DeleteProductDialog } from "@/components/admin/delete-product";

interface DialogState {
    type: 'create' | 'edit' | 'delete' | null;
    productId?: string;
    productData?: Omit<Product, 'id'>;
}

export default function Products() {
    const [dialog, setDialog] = useState<DialogState>({ type: null });
    const { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleCreate = async (data: Omit<Product, 'id'>) => {
        await createProduct(data);
    };

    const handleUpdate = async (data: Omit<Product, 'id'>) => {
        if (dialog.productId) {
            await updateProduct(dialog.productId, data);
        }
    };

    const handleDelete = async () => {
        if (dialog.productId) {
            await deleteProduct(dialog.productId);
            setDialog({ type: null });
        }
    };

    if (loading) {
        return (
            <div className="flex h-[200px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button onClick={() => setDialog({ type: 'create' })}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                    <div>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {product.description.substring(0, 50)}...
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="capitalize">{product.category}</TableCell>
                            <TableCell>{formatPrice(product.price)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                {product.rating} ({product.reviews})
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setDialog({
                                            type: 'edit',
                                            productId: product.id,
                                            productData: product
                                        })}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setDialog({
                                            type: 'delete',
                                            productId: product.id,
                                            productData: product
                                        })}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ProductFormDialog
                open={dialog.type === 'create'}
                onOpenChange={(open) => !open && setDialog({ type: null })}
                onSubmit={handleCreate}
                mode="create"
            />

            <ProductFormDialog
                open={dialog.type === 'edit'}
                onOpenChange={(open) => !open && setDialog({ type: null })}
                onSubmit={handleUpdate}
                initialData={dialog.productData}
                mode="edit"
            />

            <DeleteProductDialog
                open={dialog.type === 'delete'}
                onOpenChange={(open) => !open && setDialog({ type: null })}
                onConfirm={handleDelete}
                productName={dialog.productData?.name || ''}
            />
        </div>
    );
}