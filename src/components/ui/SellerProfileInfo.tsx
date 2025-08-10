import React, { useRef, useState } from "react";
import { Seller } from "@/types";
import ImageUploadField from "@/components/ui/ImageUploadField";

interface SellerProfileInfoProps {
  profile: Seller;
  setProfile: React.Dispatch<React.SetStateAction<Seller>>;
}

export default function SellerProfileInfo({ profile, setProfile }: SellerProfileInfoProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState(profile.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (profile.image && !profile.image.startsWith('blob:')) {
      setOriginalImage(profile.image);
    }
  }, [profile.image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImageFile(file);

    setProfile(prev => ({ ...prev, image: URL.createObjectURL(file) }));
  };


  const handleUpdate = async () => {
    setError("");
    setUploading(true);
    let imageUrl = profile.image;
    try {
      if (newImageFile) {
        const ext = newImageFile.name.split('.').pop();
        const uuidName = `${crypto.randomUUID()}.${ext}`;
        const uploadRes = await fetch(`/api/blob?filename=${uuidName}`, {
          method: 'POST',
          body: newImageFile,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          imageUrl = uploadData.url;
        } else {
          throw new Error('Error uploading image');
        }
      }

      const res = await fetch(`/api/seller/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, image: imageUrl })
      });
      if (!res.ok) throw new Error('Error updating profile');

      if (newImageFile && originalImage && !originalImage.startsWith('blob:')) {
        await fetch(`/api/blob?url=${encodeURIComponent(originalImage)}`, { method: 'DELETE' });
      }
      setOriginalImage(imageUrl);
      setNewImageFile(null);
    } catch (err) {
        console.error("Error updating profile:", err);
      setError('Error updating profile');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">Profile Information</h2>
      <form className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col items-center relative mb-2">
          <ImageUploadField
            value={profile.image}
            onChange={(url, file) => {
              setProfile(prev => ({ ...prev, image: url }));
              setNewImageFile(file || null);
            }}
            label="Shop Logo"
            width={96}
            height={96}
          />
        </div>
        <input type="text" placeholder="Full Name" className="border rounded px-3 py-2" value={profile.fullName} onChange={e => setProfile(prev => ({ ...prev, fullName: e.target.value }))} />
        <input type="email" placeholder="Email" className="border rounded px-3 py-2 bg-gray-200 text-gray-500 cursor-not-allowed" value={profile.email} disabled onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))} />
        <input type="text" placeholder="Shop Name" className="border rounded px-3 py-2" value={profile.shopName} onChange={e => setProfile(prev => ({ ...prev, shopName: e.target.value }))} />
        <textarea placeholder="Short Bio / Description" className="border rounded px-3 py-2" rows={3} value={profile.description} onChange={e => setProfile(prev => ({ ...prev, description: e.target.value }))} />
        <button type="button" className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]" onClick={handleUpdate} disabled={uploading}>{uploading ? 'Updating...' : 'Update Profile'}</button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </section>
  );
}
