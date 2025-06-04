
import { Link } from 'react-router-dom';
import { Mail, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold">EliteShop</span>
            </div>
            <p className="text-gray-300">
              Your premier destination for luxury products and exceptional shopping experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">support@eliteshop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-gray-300">1-800-ELITE-SHOP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 EliteShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
