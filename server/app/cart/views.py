from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Cart, CartItem
from .serializers import CartItemSerializer  # Assuming you have a CartItem serializer
import requests


# Helper function to get product data from the external API
def fetch_product_data(product_id):
    response = requests.get(f"https://dummyjson.com/products/{product_id}")
    if response.status_code == 200:
        return response.json()
    return None


class CartOperationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Try to fetch the user's active cart
        cart = Cart.objects.filter(user=request.user, status="active").first()

        if cart:
            cart_items = CartItem.objects.filter(cart=cart)
            total_price = sum(item.price * item.quantity for item in cart_items)
            cart_data = {
                "total_price": total_price,
                "items": CartItemSerializer(cart_items, many=True).data
            }
            return Response(cart_data)

        # If no cart exists, create one (if not already created)
        cart, created = Cart.objects.get_or_create(user=request.user, status="active")
        cart_data = {
            "total_price": 0,
            "items": []  # No items in the cart initially
        }
        return Response(cart_data)

    def post(self, request):
        # Add product to cart
        product_id = request.data.get('product_id')
        quantity = request.data.get('amount', 1)

        product_data = fetch_product_data(product_id)
        if not product_data:
            return Response({"error": "Product not found"}, status=status.HTTP_400_BAD_REQUEST)

        # Get or create a cart for the user
        cart, created = Cart.objects.get_or_create(user=request.user, status="active")

        # Create or update cart item
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id, price=product_data['price'])
        if not created:
            cart_item.quantity += quantity  # Increase the quantity if the item already exists
        cart_item.save()

        # Update total price
        cart.total_price = sum(item.price * item.quantity for item in CartItem.objects.filter(cart=cart))
        cart.save()

        return Response({"message": "Product added to cart", "cart_total": cart.total_price})

    def put(self, request):
        # Update cart item quantity
        product_id = request.data.get('product_id')
        new_amount = request.data.get('amount')

        if new_amount < 0:
            return Response({"error": "Amount must be greater than 0"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = CartItem.objects.filter(product_id=product_id, cart__user=request.user).first()
        if not cart_item:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        if new_amount == 0:
            cart_item.delete()
            cart = cart_item.cart
            cart.total_price = sum(item.price * item.amount for item in CartItem.objects.filter(cart=cart))
            cart.save()

            return Response({"message": "Cart item removed", "total_price": cart.total_price})


        cart_item.quantity = new_amount
        cart_item.save()

        # Recalculate total price
        cart = cart_item.cart
        cart.total_price = sum(item.price * item.quantity for item in CartItem.objects.filter(cart=cart))
        cart.save()

        return Response({"message": "Cart item updated", "total_price": cart.total_price})

    def delete(self, request):
        # Remove item from cart
        cart_item_id = request.data.get('cart_item_id')

        cart_item = CartItem.objects.filter(id=cart_item_id, cart__user=request.user).first()
        if not cart_item:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()

        # Recalculate total price
        cart = cart_item.cart
        cart.total_price = sum(item.price * item.quantity for item in CartItem.objects.filter(cart=cart))
        cart.save()

        return Response({"message": "Cart item removed", "total_price": cart.total_price})


class ProductListView(APIView):
    def get(self, request):
        # Fetch all products from the external API
        response = requests.get("https://dummyjson.com/products")
        if response.status_code == 200:
            products = response.json()
            return Response(products)  # Returning the list of products
        return Response({"error": "Failed to fetch products"}, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    def get(self, request, id):
        # Fetch product details for a given ID from the external API
        response = requests.get(f"https://dummyjson.com/products/{id}")
        if response.status_code == 200:
            product = response.json()
            return Response(product)  # Returning product details
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
