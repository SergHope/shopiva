export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-indigo-600">
          Shopiva
        </a>

        {/* Arama */}
        <input
          type="text"
          placeholder="Ürün ara..."
          className="hidden md:block w-1/3 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Sağ menü */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a href="/login" className="hover:text-indigo-600">Giriş Yap</a>
          <a href="/register" className="hover:text-indigo-600">Üye Ol</a>
          <a href="/cart" className="hover:text-indigo-600">🛒 Sepet</a>
        </div>
      </div>
    </header>
  );
}