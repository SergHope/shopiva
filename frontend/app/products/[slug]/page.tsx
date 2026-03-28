import type { Metadata } from "next";

async function getProduct(slug: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
    cache: 'no-store'
  });
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: `${product.name} | Shopiva`,
    description: product.description || `${product.name} - ${product.price}₺`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-gray-400">Resim yok</span>
          )}
        </div>
        <div>
          <p className="text-indigo-500 text-sm mb-1">{product.category?.name}</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <p className="text-gray-500 text-sm mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-6">{product.price} ₺</p>
          {product.variants?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Seçenekler:</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v: any) => (
                  <span key={v.id} className="border border-indigo-300 text-indigo-600 text-xs px-3 py-1 rounded-full">
                    {v.name}: {v.value}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
            Sepete Ekle
          </button>
        </div>
      </div>
    </main>
  );
}