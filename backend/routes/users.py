from fastapi import HTTPException, Depends
from fastapi.routing import APIRouter
from database import get_db
import services.user as user_crud
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

class UserBase(BaseModel):
    id: str
    email: str
    name: str
    address: str | None = None
    role: str

class UserUpdate(BaseModel):
    name: str
    address: str | None = None

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserBase)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    try:
        return user_crud.create_user(db, email=user.email, name=user.name, address=user.address)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[UserBase])
def get_all_users(db: Session = Depends(get_db)):
    users = user_crud.get_users(db)
    return users

@router.get("/{user_id}")
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = user_crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}")
def update_user_route(user_id: str, user: UserUpdate, db: Session = Depends(get_db)):
    updated_user = user_crud.update_user(db, user_id, name=user.name, address=user.address)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    success = user_crud.delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User successfully deleted"}
