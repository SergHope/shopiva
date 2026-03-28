from django.db import models
from users.models import User
from products.models import Product, ProductVariant

class Cart(models.Model):
    user       = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sepet - {self.user or self.session_id}"

class CartItem(models.Model):
    cart     = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product  = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant  = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    def get_total(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

class Order(models.Model):
    class Status(models.TextChoices):
        PENDING   = 'pending',   'Beklemede'
        CONFIRMED = 'confirmed', 'Onaylandı'
        SHIPPED   = 'shipped',   'Kargoya Verildi'
        DELIVERED = 'delivered', 'Teslim Edildi'
        CANCELLED = 'cancelled', 'İptal Edildi'

    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status     = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    address    = models.TextField()
    total      = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sipariş #{self.id} - {self.user.username}"

class OrderItem(models.Model):
    order    = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product  = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant  = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    price    = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"