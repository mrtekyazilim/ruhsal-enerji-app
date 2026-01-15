import React, { useEffect, useState } from "react";

interface User {
    _id?: string;
    name: string;
    phone: string;
}

interface Product {
    _id?: string;
    name: string;
    price: number;
}

const AdminPanel = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [randomUsers, setRandomUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newProduct, setNewProduct] = useState({ name: "", price: "" });
    const [isAdding, setIsAdding] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    // Verileri yükle
    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Tüm kullanıcıları çek
            const usersRes = await fetch(`${API_URL}/admin/users`);
            if (!usersRes.ok) throw new Error("Kullanıcılar alınamadı");
            const usersData = await usersRes.json();
            setUsers(usersData);

            // Rastgele 3 kullanıcı seç
            const shuffled = [...usersData].sort(() => 0.5 - Math.random());
            setRandomUsers(shuffled.slice(0, 3));

            // Ürünleri çek
            const productsRes = await fetch(`${API_URL}/admin/products`);
            if (!productsRes.ok) throw new Error("Ürünler alınamadı");
            const productsData = await productsRes.json();
            setProducts(productsData);

            setError("");
        } catch (err: any) {
            setError(err.message);
            console.error("API Hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [API_URL]);

    // Ürün ekle
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newProduct.name || !newProduct.price) {
            alert("Lütfen tüm alanları doldurunuz");
            return;
        }

        try {
            setIsAdding(true);
            const response = await fetch(`${API_URL}/admin/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newProduct.name,
                    price: parseFloat(newProduct.price),
                }),
            });

            if (!response.ok) throw new Error("Ürün eklenemedi");
            
            setNewProduct({ name: "", price: "" });
            await fetchData(); // Listeyi yenile
            alert("✅ Ürün başarıyla eklendi");
        } catch (err: any) {
            alert("❌ Hata: " + err.message);
        } finally {
            setIsAdding(false);
        }
    };

    // Ürün sil
    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

        try {
            const response = await fetch(`${API_URL}/admin/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Ürün silinemedi");
            
            await fetchData(); // Listeyi yenile
            alert("✅ Ürün başarıyla silindi");
        } catch (err: any) {
            alert("❌ Hata: " + err.message);
        }
    };

    if (loading) return <div className="p-6 text-center">Yükleniyor...</div>;
    if (error) return <div className="p-6 text-red-600">Hata: {error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Panel</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rastgele Kullanıcılar */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">Rastgele Kullanıcılar</h2>
                    {randomUsers.length > 0 ? (
                        <ul className="space-y-3">
                            {randomUsers.map((user) => (
                                <li key={user._id || user.phone} className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.phone}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Kullanıcı bulunamadı</p>
                    )}
                </section>

                {/* Ürünler */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Ürünler ({products.length})</h2>
                    {products.length > 0 ? (
                        <ul className="space-y-3">
                            {products.map((product) => (
                                <li key={product._id} className="p-3 bg-green-50 rounded border-l-4 border-green-500 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-lg font-bold text-green-600">${product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteProduct(product._id!)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Sil
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Ürün bulunamadı</p>
                    )}
                </section>
            </div>

            {/* Yeni Ürün Ekle */}
            <section className="bg-white p-6 rounded-lg shadow mt-6">
                <h2 className="text-2xl font-bold mb-4 text-orange-600">Yeni Ürün Ekle</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Ürün Adı</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Ürün adını girin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fiyat ($)</label>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Fiyatı girin"
                            step="0.01"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isAdding}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-2 rounded"
                    >
                        {isAdding ? "Ekleniyor..." : "Ürün Ekle"}
                    </button>
                </form>
            </section>

            {/* Tüm Kullanıcılar */}
            <section className="bg-white p-6 rounded-lg shadow mt-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-600">Tüm Kullanıcılar ({users.length})</h2>
                {users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Ad</th>
                                    <th className="px-4 py-2">Telefon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Kullanıcı bulunamadı</p>
                )}
            </section>
        </div>
    );
};

export default AdminPanel;
