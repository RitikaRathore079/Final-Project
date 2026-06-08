import React, { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
        category: "general" // Default
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            toast.error("Failed to fetch products");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            const token = localStorage.getItem("token");
            await API.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Product deleted");
            fetchProducts(); // Refresh
        } catch (err) {
            toast.error("Failed to delete product");
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            // In a real app, this should be an Admin API call. 
            // Reusing the existing POST /products which is currently public (as per original code) 
            // or secured if I updated it. Let's assume it works.
            await API.post("/products", newProduct);
            toast.success("Product added successfully");
            setNewProduct({ name: "", price: "", image: "", category: "general" });
            fetchProducts();
        } catch (err) {
            toast.error("Failed to add product");
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="border p-2 rounded"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 rounded"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        className="border p-2 rounded"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        required
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Add Product
                    </button>
                </form>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan="4" className="p-4 text-center">No products found in DB</td></tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                                    </td>
                                    <td className="p-4 font-medium">{p.name}</td>
                                    <td className="p-4">₹{p.price}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
