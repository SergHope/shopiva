import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopiva | Binlerce Ürün, Güvenli Alışveriş",
  description: "Shopiva'da elektronik, giyim, ev & yaşam ve daha fazlası. Güvenli ödeme, hızlı kargo.",
  keywords: "alışveriş, e-ticaret, elektronik, giyim, shopiva",
  openGraph: {
    title: "Shopiva | Binlerce Ürün, Güvenli Alışveriş",
    description: "Shopiva'da binlerce ürün arasından seçim yap.",
    type: "website",
  },
};

async function getProducts() {
  const res = await fetch('http://127.0.0.1:8000/api/products/', {
    cache: 'no-store'
  });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ürünler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <a key={product.id} href={`/products/${product.slug}`} className="bg-white rounded-xl shadow hover:shadow-md transition p-4 block">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                'Resim yok'
              )}
            </div>
            <p className="text-xs text-indigo-500 font-medium mb-1">{product.category?.name}</p>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-indigo-600 font-bold">{product.price} ₺</p>
            <button className="mt-3 w-full bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition">
              Sepete Ekle
            </button>
          </a>
        ))}
      </div>
    </main>
  );
}