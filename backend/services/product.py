from sqlalchemy.orm import Session
from models import Product
from typing import Optional
from sqlalchemy.exc import IntegrityError

def create_product(
    db: Session,
    name: str,
    description: str,
    price: float,
    category: str,
    image: str,
    stock: int,
    rating: float = 0.0,
    reviews: int = 0
) -> Product:
    product = Product(
        name=name,
        description=description,
        price=price,
        category=category,
        image=image,
        stock=stock,
        rating=rating,
        reviews=reviews
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def get_product(db: Session, product_id: str) -> Optional[Product]:
    return db.query(Product).filter(Product.id == product_id).first()

def get_products(db: Session):
    return db.query(Product).all()

def get_products_by_category(db: Session, category: str, skip: int = 0, limit: int = 100):
    return db.query(Product).filter(Product.category == category)\
        .offset(skip).limit(limit).all()

def update_product(
    db: Session,
    product_id: str,
    name: Optional[str] = None,
    description: Optional[str] = None,
    price: Optional[float] = None,
    category: Optional[str] = None,
    image: Optional[str] = None,
    stock: Optional[int] = None,
    rating: Optional[float] = None,
    reviews: Optional[int] = None
) -> Optional[Product]:
    product = get_product(db, product_id)
    if product:
        if name:
            product.name = name
        if description:
            product.description = description
        if price is not None:
            product.price = price
        if category:
            product.category = category
        if image:
            product.image = image
        if stock is not None:
            product.stock = stock
        if rating is not None:
            product.rating = rating
        if reviews is not None:
            product.reviews = reviews

        db.commit()
        db.refresh(product)
        return product
    return None

def delete_product(db: Session, product_id: str) -> bool:
    product = get_product(db, product_id)
    if product:
        try:
            db.delete(product)
            db.commit()
            return True
        except IntegrityError:
            db.rollback()
            raise ValueError("Delete failed - product might have related orders")
    return False

def update_product_stock(db: Session, product_id: str, quantity_change: int) -> Optional[Product]:
    product = get_product(db, product_id)
    if product:
        new_stock = product.stock + quantity_change
        if new_stock < 0:
            raise ValueError("Not enough stock")
        product.stock = new_stock
        db.commit()
        db.refresh(product)
        return product
    return None

def update_product_rating(
    db: Session,
    product_id: str,
    new_rating: float
) -> Optional[Product]:
    product = get_product(db, product_id)
    if product:
        total_rating = (product.rating * product.reviews) + new_rating
        product.reviews += 1
        product.rating = total_rating / product.reviews
        db.commit()
        db.refresh(product)
        return product
    return None
