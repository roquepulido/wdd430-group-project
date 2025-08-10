import React, {useRef, useState, useEffect} from "react";
import Image from "next/image";

interface ImageUploadFieldProps {
    value: string;
    onChange: (url: string, file?: File) => void;
    label?: string;
    className?: string;
    width?: number;
    height?: number;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
                                                               value,
                                                               onChange,
                                                               label,
                                                               className = '',
                                                               width = 96,
                                                               height = 96
                                                           }) => {
    const [preview, setPreview] = useState<string>(value);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreview(value);
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFile(file);
        setPreview(URL.createObjectURL(file));
        onChange(URL.createObjectURL(file), file);
    };

    return (
        <div className={`flex flex-col items-center relative mb-2 ${className}`}>
            {preview ? (
                <Image src={preview} alt={label || "Image"} width={width} height={height}
                       className="object-cover rounded-full border mx-auto"/>
            ) : (
                <div
                    className="w-24 h-24 bg-[#E8C07D] rounded-full flex items-center justify-center text-[#6B4F3B] mx-auto">No
                    Image</div>
            )}
            <label
                className="absolute top-0 right-0 border-2 cursor-pointer bg-white rounded-full p-1 shadow hover:bg-[#E8C07D] transition"
                title="Change image">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="#6B4F3B" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182l-9.193 9.193a4.5 4.5 0 0 1-1.897 1.13l-3.06.918.918-3.06a4.5 4.5 0 0 1 1.13-1.897l9.193-9.193z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.75l-1.5-1.5"/>
                </svg>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
            </label>
        </div>
    );
};

export default ImageUploadField;

