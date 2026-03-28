from django.urls import path
from .views import CartView, MyOrdersView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),
]