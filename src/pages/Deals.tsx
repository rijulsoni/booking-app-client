import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Percent, Clock, Users, Star, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

// Extended mock data for special offers
const specialOffers = [
  {
    id: 1,
    title: "Early Bird Summer Special",
    discount: "25% Off",
    description: "Book 60 days in advance and save 25% on summer stays. Perfect for planning ahead!",
    validUntil: "May 31, 2025",
    icon: Calendar,
    color: "bg-blue-50 text-blue-600",
    detailedDescription: "Get a head start on your summer vacation plans and enjoy significant savings. This early bird offer applies to all room types and includes free breakfast for two when you stay 3 nights or more.",
    terms: ["Minimum 2-night stay required", "Full prepayment required at time of booking", "Non-refundable", "Subject to availability"],
    hotels: [1, 3, 5, 7]
  },
  {
    id: 2,
    title: "Weekend Getaway Deal",
    discount: "15% Off",
    description: "Enjoy a spontaneous weekend escape with our special rates for Friday to Sunday stays.",
    validUntil: "Ongoing",
    icon: Percent,
    color: "bg-amber-50 text-amber-600",
    detailedDescription: "Turn your weekend into a mini-vacation with our special rates for Friday through Sunday stays. Perfect for last-minute escapes from the city.",
    terms: ["Valid for check-ins on Friday or Saturday only", "Cannot be combined with other offers", "Subject to availability"],
    hotels: [2, 4, 6, 8]
  },
  {
    id: 3,
    title: "Extended Stay Discount",
    discount: "30% Off",
    description: "Stay longer and save more. Get 30% off when you book 7+ nights at any of our properties.",
    validUntil: "December 31, 2025",
    icon: Clock,
    color: "bg-emerald-50 text-emerald-600",
    detailedDescription: "The longer you stay, the more you save. Perfect for workations, family vacations, or anyone looking to truly immerse themselves in their destination.",
    terms: ["Minimum 7-night consecutive stay required", "Discount applies to room rate only", "Subject to availability"],
    hotels: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    id: 4,
    title: "Family Package",
    discount: "Kids Stay & Eat Free",
    description: "Children under 12 stay and eat free when sharing a room with parents.",
    validUntil: "December 31, 2025",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
    detailedDescription: "Make family travel more affordable with our family package. Children under 12 stay for free when sharing a room with parents and enjoy complimentary meals from the kids' menu.",
    terms: ["Maximum 2 children per room", "Valid ID required at check-in", "Applies to select room types only", "Subject to availability"],
    hotels: [3, 4, 7, 8]
  }
];

// Mock hotel data (simplified from previous components)
const allHotels = [
  {
    id: 1,
    name: "The Grand Resort & Spa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    location: "Malibu, CA",
    rating: 4.8
  },
  {
    id: 2,
    name: "Urban Boutique Hotel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
    location: "San Francisco, CA",
    rating: 4.6
  },
  {
    id: 3,
    name: "Mountain Lodge Retreat",
    image: "https://images.unsplash.com/photo-1614957004131-9e8f2a13123c?q=80&w=2070&auto=format&fit=crop",
    location: "Aspen, CO",
    rating: 4.7
  },
  {
    id: 4,
    name: "Riverside Inn",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    location: "Portland, OR",
    rating: 4.4
  },
  {
    id: 5,
    name: "Seaside Bungalows",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    location: "Key West, FL",
    rating: 4.9
  },
  {
    id: 6,
    name: "Historic Downtown Inn",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop",
    location: "Charleston, SC",
    rating: 4.5
  },
  {
    id: 7,
    name: "Desert Oasis Resort",
    image: "https://images.unsplash.com/photo-1561501878-aabd62634533?q=80&w=2070&auto=format&fit=crop",
    location: "Scottsdale, AZ",
    rating: 4.7
  },
  {
    id: 8,
    name: "Lakeside Cabins",
    image: "https://images.unsplash.com/photo-1604846887565-640d2c9c2285?q=80&w=1854&auto=format&fit=crop",
    location: "Lake Tahoe, CA",
    rating: 4.3
  }
];

const Deals = () => {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  
  const getHotelsForOffer = (offerId: number) => {
    const offer = specialOffers.find(o => o.id === offerId);
    if (!offer) return [];
    return allHotels.filter(hotel => offer.hotels.includes(hotel.id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-hotel-blue to-hotel-dark-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Special Offers & Deals</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Exclusive promotions and packages to make your stay even more memorable and affordable.
            </p>
          </div>
        </section>
        
        {/* Featured Offers Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-hotel-blue mb-8">Current Promotions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialOffers.map((offer) => {
                const IconComponent = offer.icon;
                return (
                  <Card 
                    key={offer.id} 
                    className={`border-0 overflow-hidden hotel-card-shadow h-full ${selectedOffer === offer.id ? 'ring-2 ring-hotel-blue' : ''}`}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-full ${offer.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-hotel-blue mb-2">{offer.title}</h3>
                      <div className="text-hotel-gold font-bold text-2xl mb-3">{offer.discount}</div>
                      <p className="text-gray-600 mb-4 flex-grow">{offer.description}</p>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Valid until: {offer.validUntil}</span>
                        <Button 
                          variant="link" 
                          className="text-hotel-blue p-0"
                          onClick={() => setSelectedOffer(offer.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Selected Offer Details */}
        {selectedOffer && (
          <section className="py-12 px-4 bg-hotel-light-gray">
            <div className="container mx-auto">
              {specialOffers.filter(offer => offer.id === selectedOffer).map((offer) => {
                const IconComponent = offer.icon;
                const applicableHotels = getHotelsForOffer(offer.id);
                
                return (
                  <div key={offer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-start">
                        <div className={`w-16 h-16 rounded-full ${offer.color} flex items-center justify-center mr-6`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-hotel-blue mb-2 md:mb-0">{offer.title}</h2>
                            <div className="text-hotel-gold font-bold text-2xl">{offer.discount}</div>
                          </div>
                          
                          <p className="text-gray-600 mb-6">{offer.detailedDescription}</p>
                          
                          <div className="mb-8">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Terms & Conditions</h3>
                            <ul className="space-y-2">
                              {offer.terms.map((term, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-5 w-5 text-hotel-blue mr-2 mt-0.5 shrink-0" />
                                  <span className="text-gray-600">{term}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800 mb-4">Available at These Properties</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {applicableHotels.map((hotel) => (
                                <Link to={`/hotels/${hotel.id}`} key={hotel.id}>
                                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <img 
                                      src={hotel.image} 
                                      alt={hotel.name} 
                                      className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                      <h4 className="font-semibold text-hotel-blue mb-1">{hotel.name}</h4>
                                      <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        <span>{hotel.location}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 text-hotel-gold fill-hotel-gold mr-1" />
                                        <span className="text-sm">{hotel.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-hotel-light-blue px-8 py-4">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                          <span className="text-gray-600">Offer valid until:</span>
                          <span className="ml-2 font-semibold">{offer.validUntil}</span>
                        </div>
                        <Link to="/hotels">
                          <Button className="bg-hotel-blue hover:bg-hotel-dark-blue">
                            Browse Eligible Hotels
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        
        {/* Additional Deals */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-hotel-blue mb-8">More Ways to Save</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-hotel-blue mb-4">Loyalty Program</h3>
                <p className="text-gray-600 mb-6">
                  Join our free StayAweigh Rewards program and earn points on every stay. Redeem for free nights, 
                  room upgrades, and exclusive member-only deals.
                </p>
                <Button className="bg-hotel-blue hover:bg-hotel-dark-blue w-full">Join Now</Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-hotel-blue mb-4">Newsletter Exclusive</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter and get access to subscriber-only flash deals and promotions, 
                  plus travel tips and destination guides.
                </p>
                <Button className="bg-hotel-blue hover:bg-hotel-dark-blue w-full">Subscribe</Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-hotel-blue mb-4">Corporate Rates</h3>
                <p className="text-gray-600 mb-6">
                  Businesses can access special corporate rates and benefits for employee travel. 
                  Contact our corporate sales team for more information.
                </p>
                <Button className="bg-hotel-blue hover:bg-hotel-dark-blue w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 px-4 bg-hotel-light-gray">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-hotel-blue mb-8">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How do I redeem a special offer?",
                  answer: "To redeem a special offer, simply select the offer when booking on our website or mention the offer code when booking by phone. The discount will be automatically applied to your reservation."
                },
                {
                  question: "Can I combine multiple offers?",
                  answer: "Most offers cannot be combined with other promotions or discounts. Please check the terms and conditions of each offer for specific details."
                },
                {
                  question: "Are taxes and fees included in the discounted price?",
                  answer: "Unless specifically stated otherwise, discounts apply to the base room rate only and do not include taxes, resort fees, or other additional charges."
                },
                {
                  question: "What if I need to change or cancel a booking made with a special offer?",
                  answer: "Change and cancellation policies vary by offer. Some promotional rates may be non-refundable or have restricted cancellation policies. Please check the terms of your specific offer before booking."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg text-hotel-blue mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Deals;
