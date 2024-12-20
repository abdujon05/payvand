from fastapi import HTTPException, Depends
from fastapi.routing import APIRouter
import services.product as product_crud
from database import get_db
from sqlalchemy.orm import Session
from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str
    stock: int
    rating: float = 0.0
    reviews: int = 0

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
def read_products(db: Session = Depends(get_db)):
    products = product_crud.get_products(db)
    if not products:
        raise HTTPException(status_code=404, detail="No Products found")
    return products

@router.get("/{product_id}")
def read_product(product_id: str, db: Session = Depends(get_db)):
    product = product_crud.get_product(db, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductBase)
def create_product(product: ProductBase, db: Session = Depends(get_db)):
    return product_crud.create_product(
        db,
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        image=product.image,
        stock=product.stock,
        rating=product.rating,
        reviews=product.reviews
    )

@router.put("/{product_id}")
def update_product_route(product_id: str, product: ProductBase, db: Session = Depends(get_db)):
    updated_product = product_crud.update_product(
        db,
        product_id=product_id,
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        image=product.image,
        stock=product.stock
    )
    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    success = product_crud.delete_product(db, product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product successfully deleted"}
