import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBox from "@/components/SearchBox";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllHotels } from "@/redux/slices/allHotelSlice";

const amenities = [
  "Free Wi-Fi", 
  "Breakfast Included", 
  "Swimming Pool", 
  "Fitness Center", 
  "Spa Services",
  "Pet-Friendly", 
  "Free Parking", 
  "Restaurant"
];

const Hotels = () => {
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const { results, loading, error } = useSelector((state: RootState) => state.hotelSearch);
  const { hotels, loading: hotelsLoading } = useSelector((state: RootState) => state.allHotels);
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const dispatch = useDispatch();

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const applyFilters = () => {
    const base = results.length ? results : hotels; 
    const filtered = base.filter(hotel => {
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.some(amenity => hotel.tags?.includes(amenity));
      return matchesPrice && matchesAmenities;
    });
    setFilteredHotels(filtered);
  };

  useEffect(() => {
    if (results.length > 0) {
      setHasSearched(true);
    }
    setFilteredHotels(hasSearched ? results : hotels);
  }, [results, hotels, hasSearched]);

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-hotel-blue to-hotel-dark-blue py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Find Your Perfect Stay</h1>
            <SearchBox />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-semibold text-hotel-blue mb-6">Filters</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  max={500}
                  step={10}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Amenities</h3>
                <div className="space-y-3">
                  {amenities.map(amenity => (
                    <label 
                      key={amenity} 
                      className="flex items-center cursor-pointer"
                    >
                      <div 
                        className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${
                          selectedAmenities.includes(amenity) ? 'bg-hotel-blue border-hotel-blue' : 'border-gray-300'
                        }`}
                        onClick={() => handleAmenityToggle(amenity)}
                      >
                        {selectedAmenities.includes(amenity) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-hotel-blue hover:bg-hotel-dark-blue"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
            
            {/* Hotel Listings */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-hotel-blue">
                  {filteredHotels?.length} Hotels Available
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Sort by:</span>
                  <select className="border rounded p-2 text-sm">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
              
              {(loading || hotelsLoading) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index}>
                      <Skeleton className="h-64" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotels.map(hotel => (
                    <HotelCard 
                      key={hotel._id} 
                      {...hotel} 
                    />
                  ))}
                </div>
              )}

              {filteredHotels.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No hotels match your current filters.</p>
                  <Button variant="link" className="text-hotel-blue mt-2" onClick={() => {
                    setPriceRange([0, 400]);
                    setSelectedAmenities([]);
                    setFilteredHotels(results.length ? results : hotels);
                  }}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;
