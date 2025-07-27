import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven - Virtual Marketplace for Artisans",
  description:
    "Discover unique handcrafted items from talented artisans. Connect creators with conscious consumers in our virtual marketplace.",
};

export default function Home() {
  return (
    <div className="bg-[#F9F5F0] text-[#333333] min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-[#6B4F3B]">
              Handcrafted Haven
            </h1>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Search handcrafted items..."
                className="px-4 py-2 border border-[#E8C07D] rounded-lg focus:outline-none focus:border-[#6B4F3B] w-full"
              />
              <button className="bg-[#6B4F3B] text-white px-6 py-2 rounded-lg hover:bg-[#5a4332] transition-colors w-full sm:w-auto">
                Explore
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#E8C07D] to-[#F9F5F0] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-[#6B4F3B] mb-6">
            Where Artisans & Craft Lovers Connect
          </h2>
          <p className="text-xl text-[#333333] mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover unique handcrafted treasures from talented creators
            worldwide. Handcrafted Haven is your virtual marketplace that
            connects passionate artisans with conscious consumers who appreciate
            the beauty and quality of handmade products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#6B4F3B] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#5a4332] transition-colors">
              Shop Handcrafted Items
            </button>
            <button className="bg-white border-2 border-[#6B4F3B] text-[#6B4F3B] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#6B4F3B] hover:text-white transition-colors">
              Become a Seller
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-[#6B4F3B] mb-12">
            What Makes Us Special
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Seller Profiles */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-[#E8C07D] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h4 className="text-xl font-bold text-[#6B4F3B] mb-3">
                Artisan Profiles
              </h4>
              <p className="text-[#333333]">
                Dedicated profiles for authenticated sellers to showcase their
                craftsmanship, share their stories, and display curated
                collections of handcrafted items.
              </p>
            </div>

            {/* Product Listings */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-[#E8C07D] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <h4 className="text-xl font-bold text-[#6B4F3B] mb-3">
                Curated Marketplace
              </h4>
              <p className="text-[#333333]">
                Browse through our catalog of unique handcrafted items. Filter
                by category, price range, or other criteria to find exactly what
                you&apos;re looking for.
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-[#E8C07D] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-xl font-bold text-[#6B4F3B] mb-3">
                Reviews & Ratings
              </h4>
              <p className="text-[#333333]">
                Share your experience and help others discover amazing products.
                Leave ratings and written reviews for items you&apos;ve purchased.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#6B4F3B] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl mb-8 text-white">Our Mission</h3>
            <p className="text-lg leading-relaxed mb-6">
              Handcrafted Haven aims to revolutionize the way handcrafted items
              are discovered, appreciated, and acquired. We foster a thriving
              community of passionate creators and conscious consumers by
              providing a digital platform that supports local artisans and
              promotes sustainable consumption.
            </p>
            <p className="text-lg leading-relaxed">
              With user-friendly features, secure e-commerce capabilities, and
              emphasis on customization and community engagement, we&apos;re becoming
              the go-to destination for those seeking unique, handcrafted
              treasures.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#E8C07D] py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-[#6B4F3B] mb-6">
            Join Our Community Today
          </h3>
          <p className="text-xl text-[#333333] mb-8 max-w-2xl mx-auto">
            Whether you&apos;re an artisan looking to showcase your work or someone
            who appreciates the beauty of handcrafted items, there&apos;s a place for
            you at Handcrafted Haven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#6B4F3B] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#5a4332] transition-colors">
              Start Shopping
            </button>
            <button className="bg-white border-2 border-[#6B4F3B] text-[#6B4F3B] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#6B4F3B] hover:text-white transition-colors">
              Join as Artisan
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h4 className="text-2xl">Handcrafted Haven</h4>
          </div>
          <p className="text-gray-300 mb-4">
            Connecting artisans with conscious consumers, one handcrafted item
            at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-[#E8C07D] transition-colors">
              About
            </a>
            <a href="#" className="hover:text-[#E8C07D] transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-[#E8C07D] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#E8C07D] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
