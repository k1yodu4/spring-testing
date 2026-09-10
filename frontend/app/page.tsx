// Server Component: tự động gọi API từ Spring Boot khi render trang
async function getProducts() {
  // Lấy từ biến môi trường (Docker DNS nội bộ), mặc định là localhost khi dev trên máy thật
  const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:8080";

  const res = await fetch(`${backendUrl}/api/products`, {
    cache: "no-store", // Luôn lấy dữ liệu mới nhất từ backend
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách sản phẩm");
  }
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Danh sách linh kiện điện tử
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((item: any) => (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
          >
            <span className="text-xs text-gray-400">Mã SKU: #{item.id}</span>
            <h2 className="text-lg font-semibold text-gray-900 mt-1">
              {item.name}
            </h2>
            <p className="text-blue-600 font-medium mt-2">
              {item.price ? `${item.price.toLocaleString()} VNĐ` : "Chưa cập nhật giá"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}