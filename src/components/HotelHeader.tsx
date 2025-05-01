import { MapPin, Star } from "lucide-react";

const HotelHeader = ({ hotel, startingPrice }: { hotel: any, startingPrice: number | null }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold text-hotel-blue">{hotel.name}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-hotel-gold fill-hotel-gold mr-1" />
            <span className="font-semibold">{hotel.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.address}</span>
          </div>
        </div>
      </div>
      {startingPrice && (
        <div className="mt-4 md:mt-0 text-xl font-semibold text-hotel-blue">
          From {startingPrice}<span className="text-sm font-normal text-gray-600">/ night</span>
        </div>
      )}
    </div>
  );
};

export default HotelHeader;
