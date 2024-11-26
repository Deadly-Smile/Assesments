from rest_framework import serializers
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product_id', 'quantity', 'price', 'cart']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # Nested CartItemSerializer to show cart items

    class Meta:
        model = Cart
        fields = ['id', 'user', 'status', 'total_price', 'items']
