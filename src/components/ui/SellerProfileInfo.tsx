import React, { useRef, useState } from "react";
import Image from "next/image";
import { Seller } from "@/types";

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
          {profile.image ? (
            <Image src={profile.image} alt="Shop Logo" width={96} height={96} className="w-24 h-24 object-cover rounded-full border mx-auto" />
          ) : (
            <div className="w-24 h-24 bg-[#E8C07D] rounded-full flex items-center justify-center text-[#6B4F3B] mx-auto">No Logo</div>
          )}
          <label className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow hover:bg-[#E8C07D] transition" title="Change logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6B4F3B" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182l-9.193 9.193a4.5 4.5 0 0 1-1.897 1.13l-3.06.918.918-3.06a4.5 4.5 0 0 1 1.13-1.897l9.193-9.193z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.75l-1.5-1.5" />
            </svg>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
          </label>
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
