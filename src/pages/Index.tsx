
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import SpecialOffers from "@/components/SpecialOffers";
import Testimonials from "@/components/Testimonials";
import InfoSection from "@/components/InfoSection";
import FeaturedRooms from "@/components/FeaturedRooms";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <InfoSection />
        <FeaturedSection />
        <FeaturedRooms />
        <SpecialOffers />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
