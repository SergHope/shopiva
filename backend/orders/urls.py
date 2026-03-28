from django.urls import path
from .views import CartView, MyOrdersView, AllOrdersView, UpdateOrderStatusView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),
    path('all-orders/', AllOrdersView.as_view(), name='all-orders'),
    path('<int:pk>/update-status/', UpdateOrderStatusView.as_view(), name='update-order-status'),
]