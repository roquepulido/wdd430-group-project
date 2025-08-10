import React, {useState} from "react";
import {Seller} from "@/types";
import ImageUploadField from "@/components/ui/ImageUploadField";

interface SellerProfileInfoProps {
    readonly profile: Seller;
    readonly setProfile: React.Dispatch<React.SetStateAction<Seller>>;
}

export default function SellerProfileInfo({profile, setProfile}: SellerProfileInfoProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

  const handleImageChange = async (file: File) => {
    debugger
    if (!file) return;
    let imageStorageURL = profile.image;
    let newUrlStorageURL = "";
    try {
      const ext = file.name.split(".").pop();
      const uuidName = `${crypto.randomUUID()}.${ext}`;
      const uploadRes = await fetch(`/api/blob?filename=${uuidName}`, {
        method: "POST",
        body: file,
      });
      const uploadData = await uploadRes.json();
      if (uploadData.url) {
        newUrlStorageURL = uploadData.url;
      } else {
        throw new Error("Error uploading image");
      }

      setProfile((prev) => ({ ...prev, image: newUrlStorageURL }));

      try {
        await updateProfile(newUrlStorageURL);
        if (newUrlStorageURL) {
          await fetch(`/api/blob?url=${encodeURIComponent(imageStorageURL)}`, {
            method: "DELETE",
          });
        }
      } catch (err) {
        console.error("Error saving new image:", err);
        throw new Error("Error uploading seller - new image");
      }
    } catch (err) {
      if (newUrlStorageURL) {
        // Si la imagen nueva fue subida pero algo falló después, la borramos
        await fetch(`/api/blob?url=${encodeURIComponent(newUrlStorageURL)}`, {
          method: "DELETE",
        });
      }
      setError((err as Error).message || "Error uploading image");
    }
  };

    const updateProfile = async(urlNew?: string) => {
        try {
            debugger
            const res = await fetch(`/api/seller/${profile.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...profile, image: urlNew})
            });
            if (!res.ok) throw new Error('Error updating profile');
        } catch (err) {
            console.error("Error updating profile:", err);
            setError('Error updating profile');
        }

    };

    const handleUpdate = async () => {
        debugger
        setError("");
        setUploading(true);
        await updateProfile();
        setUploading(false);

    };

    return (
        <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">Profile Information</h2>
            <form className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col items-center relative mb-2">
                    <ImageUploadField
                        value={profile.image}
                        onChange={handleImageChange}
                        label="Shop Logo"
                        width={96}
                        height={96}
                    />
                </div>
                <input type="text" placeholder="Full Name" className="border rounded px-3 py-2" value={profile.fullName}
                       onChange={e => setProfile(prev => ({...prev, fullName: e.target.value}))}/>
                <input type="email" placeholder="Email"
                       className="border rounded px-3 py-2 bg-gray-200 text-gray-500 cursor-not-allowed"
                       value={profile.email} disabled
                       onChange={e => setProfile(prev => ({...prev, email: e.target.value}))}/>
                <input type="text" placeholder="Shop Name" className="border rounded px-3 py-2" value={profile.shopName}
                       onChange={e => setProfile(prev => ({...prev, shopName: e.target.value}))}/>
                <textarea placeholder="Short Bio / Description" className="border rounded px-3 py-2" rows={3}
                          value={profile.description}
                          onChange={e => setProfile(prev => ({...prev, description: e.target.value}))}/>
                <button type="button" className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]"
                        onClick={handleUpdate}
                        disabled={uploading}>{uploading ? 'Updating...' : 'Update Profile'}</button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
            </form>
        </section>
    );
}
