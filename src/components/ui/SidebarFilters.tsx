import React from "react";

interface SidebarFiltersProps {
    readonly categories: string[];
    readonly selectedCategories: string[];
    readonly setSelectedCategories: (cats: React.SetStateAction<string[]>) => void;
    readonly materials: string[];
    readonly selectedMaterials: string[];
    readonly setSelectedMaterials: (mats: React.SetStateAction<string[]>) => void;
    readonly tags: string[];
    readonly selectedTags: string[];
    readonly setSelectedTags: (tags: React.SetStateAction<string[]>) => void;
    readonly priceRange: number[];
    readonly setPriceRange: (range: number[]) => void;
    readonly search: string;
    readonly setSearch: (s: string) => void;
    readonly maxPrice: number;
}

export default function SidebarFilters(props: SidebarFiltersProps) {
    const {
        categories,
        selectedCategories,
        setSelectedCategories,
        materials,
        selectedMaterials,
        setSelectedMaterials,
        tags,
        selectedTags,
        setSelectedTags,
        priceRange,
        setPriceRange,
    search,
    setSearch,
    maxPrice,
    } = props;

    // Refactorizar handlers para reducir anidación
    const handleCategoryChange = (cat: string) => {
        if (cat === "All") {
            setSelectedCategories(["All"]);
        } else {
            setSelectedCategories((prev: string[]) => {
                let newCats = prev.filter((c: string) => c !== "All");
                if (prev.includes(cat)) {
                    newCats = newCats.filter((c: string) => c !== cat);
                } else {
                    newCats = [...newCats, cat];
                }
                return newCats.length === 0 ? ["All"] : newCats;
            });
        }
    };

    const handleMaterialChange = (mat: string) => {
        setSelectedMaterials((prev: string[]) =>
            prev.includes(mat)
                ? prev.filter((m) => m !== mat)
                : [...prev, mat]
        );
    };

    const handleTagChange = (tag: string) => {
        setSelectedTags((prev: string[]) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };
    return (
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-8">
            <div>
                <h2 className="font-bold text-lg mb-2 text-[#6B4F3B]">Browse Catalog</h2>
                <input
                    type="text"
                    placeholder="Search by product or store..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full mb-4 px-2 py-1 border rounded text-[#6B4F3B]"
                />
                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                    className="accent-[#E8C07D]"
                                />
                                <span
                                    className={selectedCategories.includes(cat) ? "font-bold text-[#6B4F3B]" : ""}>{cat}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Filtro de materiales */}
            <div>
                <h2 className="font-bold text-lg mb-2 text-[#6B4F3B]">Materials</h2>
                <ul className="space-y-2">
                    {materials.map((mat) => (
                        <li key={mat}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedMaterials.includes(mat)}
                                    onChange={() => handleMaterialChange(mat)}
                                    className="accent-[#E8C07D]"
                                />
                                <span className={selectedMaterials.includes(mat) ? "font-bold text-[#6B4F3B]" : ""}>{mat}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Filtro de tags */}
            <div>
                <h2 className="font-bold text-lg mb-2 text-[#6B4F3B]">Tags</h2>
                <ul className="space-y-2">
                    {tags.map((tag) => (
                        <li key={tag}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    className="accent-[#E8C07D]"
                                />
                                <span className={selectedTags.includes(tag) ? "font-bold text-[#6B4F3B]" : ""}>{tag}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="font-bold text-lg mb-2 text-[#6B4F3B]">Price Range Max ${maxPrice}</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-[#6B4F3B] mb-1">
                        <span>0</span>
                        <span>{maxPrice}</span>
                    </div>
                    <div className="relative flex items-center">
                        <input
                            type="range"
                            min={0}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={e => {
                                const max = Number(e.target.value);
                                setPriceRange([0, max]);
                            }}
                            className="w-full accent-[#E8C07D] opacity-70"
                            style={{pointerEvents: 'auto'}}
                        />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                        <span className="font-bold text-[#6B4F3B]">$0</span>
                        <span className="font-bold text-[#6B4F3B]">${priceRange[1]}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
