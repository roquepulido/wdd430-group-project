import { Metadata } from "next";

export const metadata: Metadata = {
  title:"Handcrafted Haven - Design Proposal"
};

export default function DesignProposal() {
  return (
    <div className="bg-[#F9F5F0] text-[#333333] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Handcrafted Haven</h1>
          <p className="text-xl text-[#6B4F3B]">Design Proposal</p>
        </header>

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#6B4F3B] border-b-2 border-[#E8C07D] pb-2">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Primary Color */}
            <div className="bg-[#6B4F3B] p-6 rounded-lg shadow-md">
              <p className="text-white font-bold">Primary</p>
              <p className="text-white">#6B4F3B</p>
            </div>
            {/* Secondary Color */}
            <div className="bg-[#E8C07D] p-6 rounded-lg shadow-md">
              <p className="text-[#333333] font-bold">Secondary</p>
              <p className="text-[#333333]">#E8C07D</p>
            </div>
            {/* Background */}
            <div className="bg-[#F9F5F0] p-6 rounded-lg shadow-md border border-gray-300">
              <p className="text-[#333333] font-bold">Background</p>
              <p className="text-[#333333]">#F9F5F0</p>
            </div>
            {/* Text */}
            <div className="bg-[#333333] p-6 rounded-lg shadow-md">
              <p className="text-white font-bold">Text</p>
              <p className="text-white">#333333</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#6B4F3B] border-b-2 border-[#E8C07D] pb-2">Typography</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Playfair Display</h3>
              <p className="text-lg">Used for headings and titles to convey elegance and craftsmanship.</p>
              <p className="text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Aa Bb Cc Dd Ee</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Lato</h3>
              <p className="text-lg">Used for body text and UI elements for readability and clean aesthetics.</p>
              <p className="text-4xl font-sans">Aa Bb Cc Dd Ee</p>
            </div>
          </div>
        </section>

        {/* UI Components Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#6B4F3B] border-b-2 border-[#E8C07D] pb-2">UI Components</h2>
          
          {/* Navigation Bar */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Navigation Bar</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-[#6B4F3B]">Handcrafted Haven</div>
                <div className="flex space-x-4">
                  <input type="text" placeholder="Search..." className="px-3 py-1 border rounded" />
                  <button className="bg-[#6B4F3B] text-white px-4 py-1 rounded">Login</button>
                  <button className="bg-[#E8C07D] text-[#333333] px-4 py-1 rounded">Cart (0)</button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Product Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-[#E8C07D] flex items-center justify-center">
                  <span className="text-[#6B4F3B] font-bold">Product Image</span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">Handmade Ceramic Mug</h4>
                  <p className="text-gray-600 mb-2">Beautifully crafted ceramic mug with unique glazing.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#6B4F3B]">$24.99</span>
                    <button className="bg-[#6B4F3B] text-white px-3 py-1 rounded text-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button Styles */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Button Styles</h3>
            <div className="flex space-x-4">
              <button className="bg-[#6B4F3B] text-white px-6 py-2 rounded">Primary</button>
              <button className="bg-[#E8C07D] text-[#333333] px-6 py-2 rounded">Secondary</button>
              <button className="bg-white border border-[#6B4F3B] text-[#6B4F3B] px-6 py-2 rounded">Outline</button>
            </div>
          </div>
        </section>

        {/* Page Layout Example */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-[#6B4F3B] border-b-2 border-[#E8C07D] pb-2">Page Layout Example</h2>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
            {/* Header */}
            <div className="bg-[#6B4F3B] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="text-xl font-bold">Handcrafted Haven</div>
              <div className="flex space-x-2">
                <div className="w-20 h-8 bg-[#E8C07D] rounded"></div>
                <div className="w-20 h-8 bg-[#E8C07D] rounded"></div>
              </div>
            </div>
            
            {/* Hero */}
            <div className="h-32 bg-[#E8C07D] flex items-center justify-center my-4">
              <p className="text-[#333333] font-bold">Hero Banner</p>
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-4 my-4">
              <div className="h-20 bg-[#F9F5F0] border border-[#6B4F3B] rounded flex items-center justify-center">
                <p className="text-sm">Product Card</p>
              </div>
              <div className="h-20 bg-[#F9F5F0] border border-[#6B4F3B] rounded flex items-center justify-center">
                <p className="text-sm">Product Card</p>
              </div>
              <div className="h-20 bg-[#F9F5F0] border border-[#6B4F3B] rounded flex items-center justify-center">
                <p className="text-sm">Product Card</p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-[#6B4F3B] text-white p-4 rounded-b-lg text-center">
              <p>Footer Content</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}