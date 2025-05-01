
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Percent, Clock } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Early Bird Summer Special",
    discount: "25% Off",
    description: "Book 60 days in advance and save 25% on summer stays. Perfect for planning ahead!",
    validUntil: "May 31, 2025",
    icon: Calendar,
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 2,
    title: "Weekend Getaway Deal",
    discount: "15% Off",
    description: "Enjoy a spontaneous weekend escape with our special rates for Friday to Sunday stays.",
    validUntil: "Ongoing",
    icon: Percent,
    color: "bg-amber-50 text-amber-600"
  },
  {
    id: 3,
    title: "Extended Stay Discount",
    discount: "30% Off",
    description: "Stay longer and save more. Get 30% off when you book 7+ nights at any of our properties.",
    validUntil: "December 31, 2025",
    icon: Clock,
    color: "bg-emerald-50 text-emerald-600"
  }
];

const SpecialOffers = () => {
  return (
    <section className="py-12 px-4 bg-hotel-light-gray">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-hotel-blue mb-3">Special Offers & Promotions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Take advantage of our limited-time deals and seasonal promotions to make your stay even more affordable.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            return (
              <Card key={offer.id} className="border-0 overflow-hidden hotel-card-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-full ${offer.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-hotel-blue mb-2">{offer.title}</h3>
                  <div className="text-hotel-gold font-bold text-2xl mb-3">{offer.discount}</div>
                  <p className="text-gray-600 mb-4 flex-grow">{offer.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Valid until: {offer.validUntil}</span>
                    <Button variant="link" className="text-hotel-blue p-0">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
