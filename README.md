## Assesments
# For Django
### create virtual environment
```bash
python -m venv .venv
```

### avtive virtual environment
```bash
source .venv/bin/activate
```

### install requirements
```bash
pip install -r requirements.txt
```

### make **.env.example** to **.env**

### run migration
```bash
python manage.py migrate
```

### run server
```bash
python manage.py runserver
```

## API endpoints
    - POST /api/signup/: Register a new user.
    - POST /api/login/: Log in with username and password and get JWT tokens.
    - POST /api/auth-user/: Login winth JWT token
    - GET /api/carts/user/: Get the user's cart (requires authentication).
    - POST /api/carts/user/: Add an item to the cart (requires authentication).
    - PUT /api/carts/user/: Update cart item quantity (requires authentication).
    - DELETE /api/carts/user/: Remove an item from the cart (requires authentication).
    - GET /api/products/: Get a list of products from the external API.
    - GET /api/products/{id}/: Get details of a specific product by ID.

# For React
### install package dependencies
```bash
npm install
```

### run the application
```bash
npm run dev
```

video link: [google drive](https://drive.google.com/file/d/1BINRL6uxUv6PfIJ0deu8LhbH3US_8vTM/view?usp=sharing)