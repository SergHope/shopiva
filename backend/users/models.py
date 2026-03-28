from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN    = 'admin',    'Admin'
        SELLER   = 'seller',   'Satıcı'
        CUSTOMER = 'customer', 'Müşteri'

    role  = models.CharField(max_length=10, choices=Role.choices, default=Role.CUSTOMER)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"