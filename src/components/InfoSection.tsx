
import { ShieldCheck, Clock, MapPin, Heart } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Best Price Guarantee",
    description: "We promise the best rates and will match or beat any comparable offer."
  },
  {
    icon: Clock,
    title: "Free Cancellation",
    description: "Plans change. Most bookings can be cancelled without penalty up to 24 hours before arrival."
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Our properties are carefully selected for their exceptional locations and accessibility."
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Our dedicated team ensures your stay is tailored to your preferences and needs."
  }
];

const InfoSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-hotel-blue mb-3">Why Choose StayAweigh</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We go above and beyond to ensure your travel experience is seamless and memorable.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-hotel-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-hotel-blue" />
                </div>
                <h3 className="text-xl font-semibold text-hotel-blue mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
