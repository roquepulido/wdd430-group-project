import React, {useState, useEffect} from "react";
import {ProductDetail} from "@/types";
import {blankProductDetail} from "@/types/blanks";
import Image from "next/image";

interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (product: FormData) => void;
    product?: ProductDetail;
}

const ProductModalSeller: React.FC<ProductModalProps> = ({show, onClose, onSubmit, product}) => {
    const [form, setForm] = useState<ProductDetail>(blankProductDetail);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (product) setForm(product);
        else setForm(blankProductDetail);
        setImageFile(null);
    }, [product, show]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: unknown } }
    ) => {
        const { name, value } = e.target;
        // Boolean for checkbox
        if (name === "isAvailable") {
            setForm(prev => ({ ...prev, isAvailable: Boolean(value) }));
        // Arrays for tags/materials
        } else if (name === "tags" || name === "materials") {
            setForm(prev => ({
                ...prev,
                [name]: Array.isArray(value)
                    ? (value as string[])
                    : String(value).split(',').map((t) => t.trim()),
            }));
        // Object for dimensions
        } else if (name === "dimensions") {
            // Ensure all dimension fields are numbers and not undefined
            const dims = value as { width?: number; height?: number; depth?: number };
            setForm(prev => ({
                ...prev,
                dimensions: {
                    width: dims.width ?? 0,
                    height: dims.height ?? 0,
                    depth: dims.depth ?? 0,
                }
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: name === "price" ? parseFloat(String(value)) : value }));
        }
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
        if (onSubmit) onSubmit(formData as FormData); // Ajusta según tu backend
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
             onClick={handleBackdropClick}>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-2 right-2 text-[#6B4F3B] text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">{product ? 'Edit Product' : 'Add Product'}</h2>
                <div className="flex flex-col items-center mb-4">
                    {form.image ? (
                        <Image src={typeof form.image === 'string' ? form.image : URL.createObjectURL(form.image)}
                             alt="Product" width={40} height={40} className="w-40 h-40 object-cover rounded mb-2 border"/>
                    ) : (
                        <div
                            className="w-40 h-40 bg-[#E8C07D] rounded flex flex-col items-center justify-center text-[#6B4F3B] mb-2 relative">
                            <span className="mb-2">No Image</span>
                            <label
                                className="absolute bottom-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow hover:bg-[#E8C07D] transition"
                                title="Upload image">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="#6B4F3B" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange}/>
                            </label>
                        </div>
                    )}
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Product Name" className="border rounded px-3 py-2"
                           value={form.name || ''} onChange={handleChange} required/>
                    <textarea name="description" placeholder="Description" className="border rounded px-3 py-2" rows={3}
                              value={form.description || ''} onChange={handleChange} required></textarea>
                    <input type="number" name="price" placeholder="Price (USD)" className="border rounded px-3 py-2"
                           value={form.price || ''} onChange={handleChange} required min="0" step="0.01"/>
                    <input type="text" name="category" placeholder="Category" className="border rounded px-3 py-2"
                           value={form.category || ''} onChange={handleChange} required/>
                    <input type="number" name="stock" placeholder="Stock" className="border rounded px-3 py-2"
                           value={form.stock || ''} onChange={handleChange} required min="0"/>
                    <div className="flex items-center gap-2">
                        <label className="font-bold text-[#6B4F3B]">Available:</label>
                        <input type="checkbox" name="isAvailable" checked={form.isAvailable || false}
                               onChange={e => handleChange({target: {name: 'isAvailable', value: e.target.checked}})}/>
                    </div>
                    <input type="number" name="rating" placeholder="Rating" className="border rounded px-3 py-2"
                           value={form.rating || ''} onChange={handleChange} min="0" max="5" step="0.1"/>
                    <input type="text" name="tags" placeholder="Tags (comma separated)"
                           className="border rounded px-3 py-2" value={form.tags ? form.tags.join(',') : ''}
                           onChange={e => handleChange({target: {name: 'tags', value: e.target.value}})}/>
                    <input type="text" name="materials" placeholder="Materials (comma separated)"
                           className="border rounded px-3 py-2" value={form.materials ? form.materials.join(',') : ''}
                           onChange={e => handleChange({target: {name: 'materials', value: e.target.value}})}/>
                    <div className="flex gap-2">
                        <input type="number" name="width" placeholder="Width (cm)"
                               className="border rounded px-3 py-2 w-1/3" value={form.dimensions?.width || ''}
                               onChange={e => handleChange({
                                   target: {
                                       name: 'dimensions',
                                       value: {...form.dimensions, width: Number(e.target.value)}
                                   }
                               })}/>
                        <input type="number" name="height" placeholder="Height (cm)"
                               className="border rounded px-3 py-2 w-1/3" value={form.dimensions?.height || ''}
                               onChange={e => handleChange({
                                   target: {
                                       name: 'dimensions',
                                       value: {...form.dimensions, height: Number(e.target.value)}
                                   }
                               })}/>
                        <input type="number" name="depth" placeholder="Depth (cm)"
                               className="border rounded px-3 py-2 w-1/3" value={form.dimensions?.depth || ''}
                               onChange={e => handleChange({
                                   target: {
                                       name: 'dimensions',
                                       value: {...form.dimensions, depth: Number(e.target.value)}
                                   }
                               })}/>
                    </div>
                    <button type="submit"
                            className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded hover:bg-[#cfa44e] font-bold">{product ? 'Update' : 'Add'} Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductModalSeller;