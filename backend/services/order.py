from sqlalchemy.orm import Session, joinedload
from models import Order, Product
from typing import Optional, List
from sqlalchemy.exc import IntegrityError
from datetime import datetime

def create_order(
    db: Session,
    user_id: str,
    product_id: str,
    quantity: int
) -> Optional[Order]:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    if product.stock < quantity:
        raise ValueError("Not enough stock")

    total_price = product.price * quantity

    order = Order(
        user_id=user_id,
        product_id=product_id,
        quantity=quantity,
        total_price=total_price,
        created_at=datetime.utcnow()
    )

    try:
        product.stock -= quantity

        db.add(order)
        db.commit()
        db.refresh(order)
        return order
    except Exception as e:
        db.rollback()
        raise ValueError(f"Failed to create order: {str(e)}")

def get_order(db: Session, order_id: str) -> Optional[Order]:
    return db.query(Order).filter(Order.id == order_id).first()

def get_user_orders(db: Session, user_id: str):
    orders = db.query(Order)\
        .options(joinedload(Order.product))\
        .filter(Order.user_id == user_id)\
        .order_by(Order.created_at.desc())\
        .all()
    return [
        {
            "id": order.id,
            "quantity": order.quantity,
            "total_price": order.total_price,
            "created_at": order.created_at,
            "product": {
                "id": order.product.id,
                "name": order.product.name,
                "description": order.product.description,
                "price": order.product.price,
                "category": order.product.category,
                "image": order.product.image,
                "rating": order.product.rating,
                "reviews": order.product.reviews,
                "stock": order.product.stock
            }
        }
        for order in orders
    ]


def get_orders(db: Session):
    orders = db.query(Order)\
        .options(joinedload(Order.product), joinedload(Order.user))\
        .filter(Order.user_id.isnot(None))\
        .filter(Order.product_id.isnot(None))\
        .order_by(Order.created_at.desc())\
        .all()

    return [
        {
            "id": order.id,
            "quantity": order.quantity,
            "total_price": order.total_price,
            "created_at": order.created_at,
            "user": {
                "id": order.user.id,
                "name": order.user.name,
                "email": order.user.email
            },
            "product": {
                "id": order.product.id if order.product else None,
                "name": order.product.name if order.product else None,
                "price": order.product.price if order.product else None,
                "image": order.product.image if order.product else None
            } if order.product else None
        }
        for order in orders
        if order.user and order.product
    ]

def cancel_order(db: Session, order_id: str) -> bool:
    order = get_order(db, order_id)
    if order:
        try:
            # Restore product stock
            product = db.query(Product).filter(Product.id == order.product_id).first()
            if product:
                product.stock += order.quantity

            # Delete order
            db.delete(order)
            db.commit()
            return True
        except IntegrityError:
            db.rollback()
            raise ValueError("Cancel failed")
    return False

def get_order_details(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()
