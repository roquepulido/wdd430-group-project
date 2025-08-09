import React, { useState, useEffect } from "react";
import {Product} from "@/types";

interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (product: Product) => void;
    product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, onClose, onSubmit, product }) => {
    const [form, setForm] = useState<Product>({} as Product);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (product) setForm(product);
        else setForm({} as Product);
        setImageFile(null);
    }, [product, show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === "price" ? parseFloat(value) : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", String(form.price));
        formData.append("category", form.category);
        if (imageFile) {
            formData.append("image", imageFile);
        }
        if (onSubmit) onSubmit(formData as any); // Ajusta según tu backend
        onClose();
    };

    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-[#6B4F3B] text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">{product ? 'Edit Product' : 'Add Product'}</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Product Name" className="border rounded px-3 py-2" value={form.name || ''} onChange={handleChange} required />
                    <textarea name="description" placeholder="Description" className="border rounded px-3 py-2" rows={3} value={form.description || ''} onChange={handleChange} required></textarea>
                    <input type="number" name="price" placeholder="Price (USD)" className="border rounded px-3 py-2" value={form.price || ''} onChange={handleChange} required min="0" step="0.01" />
                    <input type="text" name="category" placeholder="Category" className="border rounded px-3 py-2" value={form.category || ''} onChange={handleChange} required />
                    <input type="file" className="border rounded px-3 py-2" accept="image/*" onChange={handleImageChange} />
                    <button type="submit" className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded hover:bg-[#cfa44e] font-bold">{product ? 'Update' : 'Add'} Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;