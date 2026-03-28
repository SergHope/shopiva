export default function OrderSuccessPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Siparişiniz Alındı!</h1>
      <p className="text-gray-500 mb-8">Siparişiniz başarıyla oluşturuldu. En kısa sürede kargoya verilecektir.</p>
      <a href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition">
        Alışverişe Devam Et
      </a>
    </main>
  );
}