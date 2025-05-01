
import { Link } from "react-router-dom";
import { BedDouble, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-hotel-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <BedDouble className="h-8 w-8 mr-2" />
              <span className="text-2xl font-semibold">StayAweigh</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover exceptional accommodations tailored to your preferences and budget, with the best prices guaranteed.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/hotels" className="text-gray-300 hover:text-white transition-colors">Browse Hotels</Link></li>
              <li><Link to="/deals" className="text-gray-300 hover:text-white transition-colors">Special Offers</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">Guest Reviews</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Booking Street</li>
              <li>San Francisco, CA 94105</li>
              <li>+1 (555) 123-4567</li>
              <li>support@stayaweigh.com</li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-3">Get exclusive offers and updates</p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
              />
              <Button className="bg-hotel-gold text-black hover:bg-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2025 StayAweigh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
