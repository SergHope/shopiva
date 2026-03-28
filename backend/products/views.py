from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryListView(generics.ListAPIView):
    queryset           = Category.objects.all()
    serializer_class   = CategorySerializer
    permission_classes = [AllowAny]

class ProductListView(generics.ListAPIView):
    serializer_class   = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset           = Product.objects.filter(is_active=True)
    serializer_class   = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field       = 'slug'

class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ['seller', 'admin']:
            return Response({'error': 'Bu işlem için yetkiniz yok!'}, status=403)
        data        = request.data
        category_id = data.get('category')
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({'error': 'Kategori bulunamadı!'}, status=404)
        product = Product.objects.create(
            name        = data.get('name'),
            slug        = data.get('slug'),
            description = data.get('description', ''),
            price       = data.get('price'),
            stock       = data.get('stock', 0),
            category    = category,
            is_active   = True
        )
        return Response(ProductSerializer(product).data, status=201)

class ProductUpdateStockView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        user = request.user
        if user.role not in ['seller', 'admin']:
            return Response({'error': 'Bu işlem için yetkiniz yok!'}, status=403)
        try:
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Ürün bulunamadı!'}, status=404)
        product.stock = request.data.get('stock', product.stock)
        product.save()
        return Response(ProductSerializer(product).data)