from django.urls import path
from .views import CartOperationsView, ProductListView, ProductDetailView

urlpatterns = [
    path('carts/user/', CartOperationsView.as_view(), name='cart-operations'),
    # ... path for products
    path('products/', ProductListView.as_view(), name='products'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
]
