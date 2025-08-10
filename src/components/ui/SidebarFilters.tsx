import React from "react";

interface SidebarFiltersProps {
  categories: string[];
  selectedCategories: string[];
    setSelectedCategories: (cats: React.SetStateAction<string[]>) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  search: string;
  setSearch: (s: string) => void;
}

export default function SidebarFilters({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  search,
  setSearch,
}: SidebarFiltersProps) {
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
                  onChange={() => {
                    if (cat === "All") {
                      setSelectedCategories(["All"]);
                    } else {
                      setSelectedCategories((prev: any) => {
                        let newCats = prev.filter((c: any) => c !== "All");
                        if (prev.includes(cat)) {
                          newCats = newCats.filter((c: any) => c !== cat);
                        } else {
                          newCats = [...newCats, cat];
                        }
                        return newCats.length === 0 ? ["All"] : newCats;
                      });
                    }
                  }}
                  className="accent-[#E8C07D]"
                />
                <span className={selectedCategories.includes(cat) ? "font-bold text-[#6B4F3B]" : ""}>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2 text-[#6B4F3B]">Price Range Max ${priceRange[1]}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-[#6B4F3B] mb-1">
            <span>0</span>
            <span>100</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={priceRange[1]}
              onChange={e => {
                const max = Number(e.target.value);
                setPriceRange([0, max]);
              }}
              className="w-full accent-[#E8C07D] opacity-70"
              style={{ pointerEvents: 'auto' }}
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
