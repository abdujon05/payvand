from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Product, User, Order
from utils.auth_utils import get_password_hash
from datetime import datetime
from mock_data import users_data, products_data
import random

SQLALCHEMY_DATABASE_URL = "sqlite:///./payvand.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_sample_data():
    db = SessionLocal()
    try:
        Base.metadata.create_all(bind=engine)

        created_users = []
        for user_data in users_data:
            user = User(**user_data)
            db.add(user)
            db.flush()
            created_users.append(user)

        created_products = []
        for product_data in products_data:
            product_data["rating"] = round(random.uniform(3.5, 5.0), 1)
            product_data["reviews"] = random.randint(10, 200)
            product = Product(**product_data)
            db.add(product)
            db.flush()
            created_products.append(product)

        db.commit()
        print(f"Added {len(created_users)} users!")
        print(f"Added {len(products_data)} products!")

    except Exception as e:
        print(f"Error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
