
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface HotelCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  address: string;
  tags?: string[];
}

const HotelCard = ({
  _id,
  name,
  image,
  description,
  price,
  rating,
  address,
  starting_price,
  tags = []
}: HotelCardProps) => {
  return (
    <Link to={`/hotels/${_id}`}>
      <Card className="overflow-hidden h-full hotel-card-shadow border-0">
        <div className="relative h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {rating >= 4.5 && (
            <Badge className="absolute top-3 right-3 bg-hotel-gold text-black border-0">
              Top Rated
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-hotel-blue">{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-hotel-gold mr-1 fill-hotel-gold" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{address}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-hotel-light-blue text-hotel-blue border-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
          {starting_price &&
            <div>
              <span className="text-xl font-semibold text-hotel-blue">
                From ₹ {starting_price}
              </span>
              <span className="text-gray-500 text-sm"> / night</span>
            </div>}
          <Badge className="bg-hotel-blue hover:bg-hotel-dark-blue cursor-pointer">
            View Details
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default HotelCard;
