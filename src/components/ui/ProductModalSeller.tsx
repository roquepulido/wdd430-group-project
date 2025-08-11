import React, {useState, useEffect} from "react";
import {ProductDetail} from "@/types";
import {blankProductDetail} from "@/types/blanks";
import ImageUploadField from "@/components/ui/ImageUploadField";
import PillsInput from "@/components/ui/PillsInput";

interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (product: ProductDetail) => void;
    product?: ProductDetail;
}

const ProductModalSeller: React.FC<ProductModalProps> = ({show, onClose, onSubmit, product}) => {
    const [form, setForm] = useState<ProductDetail>(blankProductDetail);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (product) {
            console.log("ProductModalSeller useEffect", product);
            setForm(product);
        } else setForm(blankProductDetail);
        setImageFile(null);
    }, [product, show]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: unknown } }
    ) => {
        const {name, value} = e.target;
        // Boolean for checkbox
        if (name === "isAvailable") {
            setForm(prev => ({...prev, isAvailable: Boolean(value)}));
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
            setForm(prev => ({...prev, [name]: name === "price" ? parseFloat(String(value)) : value}));
        }
    };

    // Cambia la lógica: si es nuevo producto, solo guarda el file en state; si es update, sube/cambia al instante
    const handleImageChange = async (file: File) => {
        if (!file) return;
        if (!product?.id || product.id === 0) {
            // Producto nuevo: solo guarda el file, la imagen se sube al submit
            setImageFile(file);
            setForm(prev => ({...prev, image: ''}));
        } else {
            // Producto existente: subir/cambiar al instante (como antes)
            const prevImageUrl = form.image;
            let newImageUrl = "";
            try {
                const ext = file.name.split('.').pop();
                const uuidName = `${crypto.randomUUID()}.${ext}`;
                const uploadRes = await fetch(`/api/blob?filename=${uuidName}`, {
                    method: 'POST',
                    body: file,
                });
                const uploadData = await uploadRes.json();
                if (uploadData.url) {
                    newImageUrl = uploadData.url;
                } else {
                    throw new Error("Error uploading image");
                }
                setForm(prev => ({...prev, image: newImageUrl}));
                setImageFile(file);
                // Si hay imagen previa, la borramos después de subir la nueva
                if (prevImageUrl && !prevImageUrl.startsWith('blob:')) {
                    await fetch(`/api/blob?url=${encodeURIComponent(prevImageUrl)}`, {method: 'DELETE'});
                }
            } catch (err) {
                console.error("Error changing product image:", err);
                if (newImageUrl) {
                    // Si la imagen nueva fue subida pero algo falló después, la borramos
                    await fetch(`/api/blob?url=${encodeURIComponent(newImageUrl)}`, {method: 'DELETE'});
                }
                // Opcional: podrías mostrar un error al usuario
                // setError((err as Error).message || "Error uploading image");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let productData : ProductDetail = {...form};
        // Si es producto nuevo y hay imagen, súbela aquí
        if ((!product?.id || product?.id === 0) && imageFile) {
            let newImageUrl = '';
            try {
                const ext = imageFile.name.split('.').pop();
                const uuidName = `${crypto.randomUUID()}.${ext}`;
                const uploadRes = await fetch(`/api/blob?filename=${uuidName}`, {
                    method: 'POST',
                    body: imageFile,
                });
                const uploadData = await uploadRes.json();
                if (uploadData.url) {
                    newImageUrl = uploadData.url;
                } else {
                    throw new Error('Error uploading image');
                }
                productData = {...productData, image: newImageUrl};
            } catch (err) {
                console.error("Error uploading image:", err);
                // Si la imagen nueva fue subida pero algo falló después, la borramos
                if (newImageUrl) {
                    await fetch(`/api/blob?url=${encodeURIComponent(newImageUrl)}`, {method: 'DELETE'});
                }
                // Opcional: podrías mostrar un error al usuario
                // setError((err as Error).message || 'Error uploading image');
            }
        }
        if (onSubmit) onSubmit(productData); 
        onClose();
    };

    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-2 right-2 text-[#6B4F3B] text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">{product?.id != 0 ? 'Edit Product' : 'Add Product'}</h2>
                <div className="flex flex-col items-center mb-4">
                    <ImageUploadField
                        value={form.image}
                        onChange={handleImageChange}
                        label="Product Image"
                        width={160}
                        height={160}
                    />
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
                    <PillsInput
                        value={form.tags || []}
                        onChange={tags => setForm(prev => ({...prev, tags}))}
                        placeholder="Add tag and press Enter or comma"
                        label="Tags"
                    />
                    <PillsInput
                        value={form.materials || []}
                        onChange={materials => setForm(prev => ({...prev, materials}))}
                        placeholder="Add material and press Enter or comma"
                        label="Materials"
                    />
                    <div className="flex flex-wrap gap-2 mb-2">
                        {form.tags && form.tags.map((tag, idx) => (
                            <span key={tag + idx}
                                  className="bg-[#E8C07D] text-[#6B4F3B] px-3 py-1 rounded-full flex items-center">
                                {tag}
                            </span>
                        ))}
                        {form.materials && form.materials.map((mat, idx) => (
                            <span key={mat + idx}
                                  className="bg-[#6B4F3B] text-white px-3 py-1 rounded-full flex items-center">
                                {mat}
                            </span>
                        ))}
                    </div>
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
                            className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded hover:bg-[#cfa44e] font-bold">{product?.id != 0 ? 'Update' : 'Add'} Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductModalSeller;