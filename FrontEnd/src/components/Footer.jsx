import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-black text-white pb-10 relative">
        
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-orange-500">🏠</span>
              <span>Daily</span>
              <span className="text-orange-500">Mart</span>
            </h2>

            <p className="mt-4 text-sm text-gray-300">
              Your trusted local kirana partner.  
              Providing quality products and best service.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <span
                    key={i}
                    className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 cursor-pointer transition"
                  >
                    <Icon />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-orange-500 cursor-pointer">Home</li>
              <li className="hover:text-orange-500 cursor-pointer">Products</li>
              <li className="hover:text-orange-500 cursor-pointer">About Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">📞 +91 98765 43210</p>
            <p className="text-sm text-gray-300 mt-2">✉ info@kiranadukan.com</p>
            <p className="text-sm text-gray-300 mt-2">
              📍 Khandwa
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-3">
              Subscribe to our newsletter
            </p>

            

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
          <p>Privacy Policy | Terms of Service | Sitemap</p>
          <p className="mt-2">
            © 2025 DailyMart. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg transition z-50"
      >
        ↑ Top
      </button>
    </>
  );
};

export default Footer;
