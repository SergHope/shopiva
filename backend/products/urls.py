from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, ProductCreateView, ProductUpdateStockView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('create/', ProductCreateView.as_view(), name='product-create'),
    path('<int:pk>/update-stock/', ProductUpdateStockView.as_view(), name='product-update-stock'),
    path('', ProductListView.as_view(), name='product-list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]