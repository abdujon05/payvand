from utils.auth_utils import get_password_hash


products_data =[
    {
      "name": "Premium Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation and premium sound quality.",
      "price": 143999.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "stock": 50
    },
    {
      "name": "Gaming Laptop",
      "description": "Powerful gaming laptop with RTX 3080, 32GB RAM, and 1TB SSD.",
      "price": 1200000,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      "stock": 15
    },
    {
      "name": "Smart Watch Series 5",
      "description": "Advanced smartwatch with health monitoring and GPS.",
      "price": 167999.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "stock": 30
    },
    {
      "name": "Professional Camera",
      "description": "24MP full-frame mirrorless camera with 4K video capabilities.",
      "price": 576000,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      "stock": 20
    },
    {
      "name": "Designer Backpack",
      "description": "Stylish and spacious backpack perfect for daily use.",
      "price": 43199.52,
      "category": "fashion",
      "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "stock": 100
    },
    {
      "name": "Running Shoes",
      "description": "Comfortable and lightweight running shoes for professional athletes.",
      "price": 62399.52,
      "category": "sports",
      "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "stock": 75
    },
    {
      "name": "Smart Home Speaker",
      "description": "Voice-controlled smart speaker with premium sound quality.",
      "price": 76799.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
      "stock": 40
    },
    {
      "name": "Coffee Maker",
      "description": "Professional-grade coffee maker with milk frother.",
      "price": 215999.52,
      "category": "appliances",
      "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
      "stock": 25
    },
    {
      "name": "Premium Smart Watch",
      "description": "Advanced smartwatch with health monitoring, notifications, and GPS tracking.",
      "price": 3499.99,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "stock": 30
    },
    {
    "name": "USB-C Hub Adapter",
    "description": "10-in-1 USB-C hub with HDMI, USB 3.0, card reader, and power delivery.",
    "price": 899.99,
    "category": "accessories",
    "image": "https://images.unsplash.com/photo-1616578273577-5d54546f4dec?q=80",
    "stock": 100
    },
    {
      "name": "Noise-Cancelling Earbuds",
      "description": "True wireless earbuds with active noise cancellation and premium sound quality.",
      "price": 2499.99,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "stock": 75
    },
    {
    "name": "Laptop Stand",
    "description": "Ergonomic aluminum laptop stand with adjustable height and cooling design.",
    "price": 799.99,
    "category": "accessories",
    "image": "https://images.unsplash.com/photo-1629893251041-41ebe30772b0?q=80",
    "stock": 120
    },
    {
      "name": "Sunglasses",
      "description": "Polarized sunglasses with UV protection.",
      "price": 38399.52,
      "category": "fashion",
      "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "stock": 80
    },
    {
    "name": "Wireless Gaming Mouse",
    "description": "High-precision wireless gaming mouse with RGB lighting and customizable buttons.",
    "price": 1899.99,
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    "stock": 45
    },
    {
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with programmable buttons.",
      "price": 23999.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      "stock": 100
    },
    {
      "name": "Water Bottle",
      "description": "Insulated stainless steel water bottle, keeps drinks cold for 24 hours.",
      "price": 14399.52,
      "category": "sports",
      "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      "stock": 200
    },
    {
      "name": "Phone Stand",
      "description": "Adjustable aluminum phone stand for desk use.",
      "price": 9599.52,
      "category": "accessories",
      "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
      "stock": 150
    },
    {
      "name": "Wireless Keyboard",
      "description": "Mechanical wireless keyboard with RGB backlight.",
      "price": 62399.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "stock": 45
    },
    {
      "name": "Gaming Console Pro",
      "description": "Next-gen gaming console with 4K graphics and 1TB storage.",
      "price": 431999.52,
      "category": "gaming",
      "image": "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80",
      "stock": 30
    },
    {
      "name": "Drone Camera",
      "description": "Professional drone with 4K camera and 30min flight time.",
      "price": 623999.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80",
      "stock": 15
    },
    {
      "name": "Smart Ring",
      "description": "Health tracking smart ring with sleep monitoring.",
      "price": 143999.52,
      "category": "wearables",
      "image": "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
      "stock": 40
    },
    {
      "name": "Air Purifier",
      "description": "HEPA air purifier with PM2.5 filter.",
      "price": 167999.52,
      "category": "home",
      "image": "https://images.unsplash.com/photo-1632928274371-878938e4d825?q=80",
      "stock": 25
    },
    {
      "name": "Smart Mirror",
      "description": "Touch-enabled smart mirror with weather updates.",
      "price": 767999.52,
      "category": "home",
      "image": "https://images.unsplash.com/photo-1595428774752-c87f23e7fcee?q=80",
      "stock": 10
    },
    {
      "name": "Electric Scooter",
      "description": "Foldable electric scooter with 25km range.",
      "price": 287999.52,
      "category": "transport",
      "image": "https://images.unsplash.com/photo-1604868189265-219ba7bf7ea3?w=800&q=80",
      "stock": 20
    },
    {
      "name": "Smart Door Lock",
      "description": "Fingerprint and PIN enabled smart door lock.",
      "price": 119999.52,
      "category": "security",
      "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      "stock": 35
    },
    {
      "name": "Robot Vacuum",
      "description": "AI-powered robot vacuum with mopping function.",
      "price": 335999.52,
      "category": "home",
      "image": "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?w=800&q=80",
      "stock": 25
    },
    {
      "name": "Fitness Tracker",
      "description": "Advanced fitness band with SpO2 monitoring.",
      "price": 62399.52,
      "category": "wearables",
      "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
      "stock": 60
    },
    {
      "name": "Wireless Earbuds",
      "description": "Premium wireless earbuds with active noise cancellation.",
      "price": 86399.52,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
      "stock": 45
    }
]
users_data = [
    {
        "email": "admin@payvand.com",
        "name": "Admin User",
        "address": "123 Main St, Dushanbe",
        "hashed_password": get_password_hash("admin123"),
        "role": "admin"
    },
    {
        "email": "manager@payvand.com",
        "name": "Manager User",
        "address": "456 Park Ave, Khujand",
        "hashed_password": get_password_hash("manager123"),
        "role": "manager"
    },
    {
        "email": "user@payvand.com",
        "name": "Regular User",
        "address": "789 Oak Rd, Bokhtar",
        "hashed_password": get_password_hash("user123"),
        "role": "user"
    }
]
