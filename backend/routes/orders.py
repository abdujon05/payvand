from fastapi import HTTPException, Depends
from fastapi.routing import APIRouter
from database import get_db
import services.order as order_crud
from sqlalchemy.orm import Session
from pydantic import BaseModel

class OrderBase(BaseModel):
    user_id: str
    product_id: str
    quantity: int

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/")
def create_order_route(order: OrderBase, db: Session = Depends(get_db)):
    try:
        return order_crud.create_order(
            db,
            user_id=order.user_id,
            product_id=order.product_id,
            quantity=order.quantity
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{order_id}")
def read_order(order_id: str, db: Session = Depends(get_db)):
    order = order_crud.get_order(db, order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/{user_id}/orders/")
def read_user_orders(user_id: str, db: Session = Depends(get_db)):
    orders = order_crud.get_user_orders(db, user_id=user_id)
    return orders

@router.delete("/{order_id}")
def cancel_order_route(order_id: str, db: Session = Depends(get_db)):
    try:
        success = order_crud.cancel_order(db, order_id)
        if not success:
            raise HTTPException(status_code=404, detail="Order not found")
        return {"message": "Order cancelled successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
def get_all_orders(db: Session = Depends(get_db)):
    orders = order_crud.get_orders(db)
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found")
    return orders
