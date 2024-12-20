from sqlalchemy.orm import Session
from models import User
from typing import Optional
from sqlalchemy.exc import IntegrityError

def create_user(db: Session, email: str, name: str, address: Optional[str] = None) -> User:
    user = User(
        email=email,
        name=name,
        address=address
    )
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        db.rollback()
        raise ValueError("User with this email already exists")

def get_user(db: Session, user_id: str) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_users(db: Session):
    return db.query(User).all()

def update_user(db: Session, user_id: str, name: Optional[str] = None,
                address: Optional[str] = None) -> Optional[User]:
    user = get_user(db, user_id)
    if user:
        if name:
            user.name = name
        if address:
            user.address = address
        try:
            db.commit()
            db.refresh(user)
            return user
        except IntegrityError:
            db.rollback()
            raise ValueError("Update failed")
    return None

def delete_user(db: Session, user_id: str) -> bool:
    user = get_user(db, user_id)
    if user:
        try:
            db.delete(user)
            db.commit()
            return True
        except IntegrityError:
            db.rollback()
            raise ValueError("Delete failed - user might have related orders")
    return False
