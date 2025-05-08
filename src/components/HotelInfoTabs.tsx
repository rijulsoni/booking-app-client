// components/HotelInfoTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HotelInfoTabs = ({ hotel, amenities, rooms, selectedRoom, setSelectedRoom }: { hotel: any, amenities: any, rooms: any[], selectedRoom: string | null, setSelectedRoom: (room: string | null) => void }) => {
    return (
        <div className="lg:w-2/3">
            <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rooms">Rooms</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-hotel-blue mb-4">About This Hotel</h2>
                        <p className="text-gray-600">{hotel.description}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-hotel-blue mb-4">Popular Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {amenities && typeof amenities === 'object' ? (
                                Object.entries(amenities)
                                    .filter(([key, value]) => value === true)
                                    .slice(0, 6)
                                    .map(([key, value], index) => (
                                        <div key={key + index} className="flex items-center">
                                            <CheckIcon className="h-4 w-4 text-hotel-blue mr-2" />
                                            <span className="text-gray-600">{key.replace('_', ' ').toUpperCase()}</span> {/* Format key */}
                                        </div>
                                    ))
                            ) : (
                                <p className="text-gray-600">No amenities available</p>
                            )}
                        </div>
                    </div>

                </TabsContent>


                <TabsContent value="rooms" className="mt-0">
                    <h2 className="text-xl font-semibold text-hotel-blue mb-4">Available Rooms</h2>
                    <div className="space-y-6">
                        {rooms && rooms?.length > 0 ? (
                            rooms.map((room: any) => (
                                <Link
                                    to={`/hotels/${room.hotel_id}/room/${room._id}`}
                                    key={room._id}

                                >

                                    <div key={room._id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3">
                                            <img
                                                src={room.image}
                                                alt={room.name}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="md:w-2/3 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-hotel-blue">{room.name}</h3>
                                                <p className="text-gray-600 mt-1">{room.description}</p>
                                                <div className="flex items-center mt-2 text-gray-600">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    <span>Up to {room.capacity} guests</span>
                                                </div>
                                                <div className="flex items-center mt-2 text-gray-600">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    <span>{room.adults} adults</span>
                                                    {room.children > 0 && (
                                                        <>
                                                            / <span>{room.children} children</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div>
                                                    {room.discount ? (
                                                        <div className="text-sm">
                                                            <span className="line-through text-gray-500 mr-2">${room.price}</span>
                                                            <span className="text-lg font-semibold text-green-600">
                                                                ${room.price - (room.price * room.discount / 100)}
                                                            </span>
                                                            <span className="text-sm text-gray-600"> / night</span>
                                                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                                {room.discount}% OFF
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="text-lg font-semibold text-hotel-blue">${room.price}</span>
                                                            <span className="text-sm text-gray-600"> / night</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <Button
                                                    variant={selectedRoom === room.id ? "secondary" : "default"}
                                                    className={selectedRoom === room.id ? "bg-gray-100" : "bg-hotel-blue hover:bg-hotel-dark-blue"}
                                                    onClick={(e) => {
                                                        e.preventDefault(); // prevent navigation
                                                        e.stopPropagation(); // prevent triggering Link
                                                        setSelectedRoom(room._id);
                                                        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    disabled={!room.availability}
                                                >
                                                    {!room.availability ? 'Not Available' : selectedRoom === room.id ? 'Selected' : 'Select Room'}
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No rooms available</p>
                        )}
                    </div>
                </TabsContent>



                <TabsContent value="amenities" className="mt-0">
                    <h2 className="text-xl font-semibold text-hotel-blue mb-4">All Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                        {amenities && typeof amenities === 'object' ? (
                            Object.entries(amenities)
                                .filter(([key, value]) => value === true)
                                .map(([key, value], index) => (
                                    <div key={key + index} className="flex items-center">
                                        <CheckIcon className="h-4 w-4 text-hotel-blue mr-2" />
                                        <span className="text-gray-600">{key.replace('_', ' ').toUpperCase()}</span> {/* Format key */}
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-600">No amenities available</p>
                        )}
                    </div>
                </TabsContent>
                {/* 
      <TabsContent value="reviews" className="mt-0">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-hotel-blue mb-4">Guest Reviews</h2>

          <div className="mb-8 flex items-center">
            <div className="bg-hotel-blue text-white rounded-lg p-3 w-16 h-16 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold">{hotel.rating}</span>
            </div>
            <div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? 'text-hotel-gold fill-hotel-gold' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-1">Based on {hotel.reviews.length} reviews</p>
            </div>
          </div>

          <div className="space-y-6">
            {hotel.reviews.map((review: any) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-hotel-blue mr-2">{review.user}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-hotel-gold fill-hotel-gold' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent> */}
            </Tabs>
        </div>
    );
};

export default HotelInfoTabs;
