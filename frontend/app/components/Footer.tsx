export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo ve açıklama */}
        <div>
          <h2 className="text-white text-xl font-bold mb-2">Shopiva</h2>
          <p className="text-sm">Binlerce ürün, güvenli alışveriş.</p>
        </div>

        {/* Linkler */}
        <div>
          <h3 className="text-white font-semibold mb-2">Hızlı Linkler</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-white">Ana Sayfa</a></li>
            <li><a href="/products" className="hover:text-white">Ürünler</a></li>
            <li><a href="/contact" className="hover:text-white">İletişim</a></li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="text-white font-semibold mb-2">İletişim</h3>
          <p className="text-sm">info@shopiva.com</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-700">
        © 2026 Shopiva. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}