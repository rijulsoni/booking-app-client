
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Hotel,
  Users,
  MapPin,
  CheckIcon
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-hotel-blue to-hotel-dark-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About StayAweigh</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Connecting travelers with exceptional accommodations since 2015.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
                  alt="Luxury hotel view" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-hotel-blue mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2015, StayAweigh began with a simple mission: to help travelers find the perfect accommodations 
                  that match their unique preferences and budgets. What started as a small startup in San Francisco has grown 
                  into a trusted platform connecting millions of travelers with exceptional hotels around the world.
                </p>
                <p className="text-gray-600 mb-6">
                  Our founders, avid travelers themselves, were frustrated with the impersonal nature of existing booking platforms. 
                  They envisioned a service that would focus on personalization and curated experiences, ensuring that every stay 
                  is memorable for the right reasons.
                </p>
                <p className="text-gray-600">
                  Today, we partner with over 10,000 hotels globally, from boutique gems to luxury resorts, all carefully 
                  selected to meet our stringent quality standards.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 px-4 bg-hotel-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-hotel-blue mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                At the heart of our business are core principles that guide every decision we make.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-hotel-light-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-hotel-blue" />
                </div>
                <h3 className="text-xl font-semibold text-hotel-blue mb-4">Customer First</h3>
                <p className="text-gray-600">
                  We prioritize our customers' needs above all else, striving to provide exceptional service 
                  and personalized experiences that exceed expectations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-hotel-light-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckIcon className="h-8 w-8 text-hotel-blue" />
                </div>
                <h3 className="text-xl font-semibold text-hotel-blue mb-4">Quality & Trust</h3>
                <p className="text-gray-600">
                  We maintain high standards for all our hotel partners and build trust through transparent 
                  practices, honest reviews, and reliable service.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-hotel-light-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-hotel-blue" />
                </div>
                <h3 className="text-xl font-semibold text-hotel-blue mb-4">Local Connections</h3>
                <p className="text-gray-600">
                  We believe in supporting local communities and helping travelers connect 
                  meaningfully with their destinations through authentic experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-hotel-blue mb-4">Meet Our Leadership Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind StayAweigh who work tirelessly to bring you exceptional travel experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alexandra Chen",
                  title: "Chief Executive Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                },
                {
                  name: "Marcus Williams",
                  title: "Chief Technology Officer",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                },
                {
                  name: "Sophia Rodriguez",
                  title: "Chief Marketing Officer",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                },
                {
                  name: "David Kim",
                  title: "Chief Operations Officer",
                  image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-hotel-blue mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4 bg-hotel-blue text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Stay?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have discovered their ideal accommodations through StayAweigh.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/hotels">
                <Button className="bg-white text-hotel-blue hover:bg-gray-100">
                  <Hotel className="mr-2 h-4 w-4" />
                  Browse Hotels
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-hotel-dark-blue">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
