
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    location: "New York, NY",
    rating: 5,
    comment: "Our stay at The Grand Resort was absolutely perfect. The staff went above and beyond to make our anniversary special. The ocean view room was breathtaking!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Seattle, WA",
    rating: 5,
    comment: "The Urban Boutique Hotel exceeded our expectations. The rooftop bar has the best views in the city, and the room design was so unique and comfortable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Denver, CO",
    rating: 4,
    comment: "We loved our stay at the Mountain Lodge. The fireplace in our room made for cozy evenings after hiking. Will definitely return for ski season.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-hotel-blue mb-3">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from travelers who have experienced our exceptional hospitality.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 hotel-card-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-hotel-gold fill-hotel-gold' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hotel-blue">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
