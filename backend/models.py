from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum

def generate_id():
    return str(uuid.uuid4())[:8]

Base = declarative_base()

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"
    MANAGER = "manager"

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, default=generate_id)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.USER, nullable=False)
    hashed_password = Column(String, nullable=False)

    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = 'products'

    id = Column(String, primary_key=True, default=generate_id)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    image = Column(String, nullable=False)
    rating = Column(Float, default=0.0)
    reviews = Column(Integer, default=0)
    stock = Column(Integer, nullable=False, default=0)


class Order(Base):
    __tablename__ = 'orders'

    id = Column(String, primary_key=True, default=generate_id)
    user_id = Column(Integer, ForeignKey('users.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    product = relationship("Product")
