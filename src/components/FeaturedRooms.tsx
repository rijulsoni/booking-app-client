import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { fetchFeaturedRooms } from "@/redux/slices/featuredRoomSlice";
import { AppDispatch, RootState } from "@/redux/store/store";

const FeaturedRooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAll, setShowAll] = useState(false);

  const { featuredRooms, loading, error } = useSelector(
    (state: RootState) => state.featuredRooms
  );
  console.log(featuredRooms)

  useEffect(() => {
    dispatch(fetchFeaturedRooms());
  }, [dispatch]);

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} className="h-full border-0 shadow-sm">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-5 space-y-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-20" />
        </CardFooter>
      </Card>
    ));

  const visibleRooms = showAll ? featuredRooms : featuredRooms.slice(0, 6);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-hotel-blue">
              Featured Rooms
            </h2>
            {!loading && featuredRooms.length > 6 && (
              <Button
                variant="link"
                className="text-hotel-blue flex items-center"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "View All"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
          <p className="text-gray-600 mt-2">
            Discover our most popular accommodations
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {!loading && featuredRooms.length === 0 && !error && (
          <p className="text-center text-gray-500">
            No featured rooms available.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? renderSkeletons()
            : visibleRooms.map((room) => (
                <Link to={`/hotels/${room.hotel_id}/room/${room._id}`} key={room._id}>
                  <Card className="overflow-hidden h-full border-0 hotel-card-shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <img
                        src={room.image}
                        alt={room.name || "Room image"}
                        className="w-full h-full object-cover"
                      />
                      
                      {room.discount && room.discount > 0 && (
                        <Badge className="absolute top-3 left-3 bg-hotel-gold text-black border-0">
                          {room.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-hotel-blue mb-1">
                        {room.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{room.capacity} guests max</span>
                        {room.adults !== undefined &&
                          room.children !== undefined && (
                            <span className="text-gray-500">
                              ({room.adults} adults, {room.children} children)
                            </span>
                          )}
                      </div>
                    </CardContent>
                    <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
                      <div>
                        <span className="text-xl font-semibold text-hotel-blue">
                          ${room.price}
                        </span>
                        {room.discount && room.discount > 0 && (
                          <span className="text-sm text-red-500 line-through ml-2">
                            ${Math.round(room.price / (1 - room.discount / 100))}
                          </span>
                        )}
                        <span className="text-gray-500 text-sm block">
                          per night
                        </span>
                      </div>
                      <Badge className="bg-hotel-blue hover:bg-hotel-dark-blue cursor-pointer">
                        View Details
                      </Badge>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
