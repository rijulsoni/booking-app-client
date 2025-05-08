import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Star, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { fetchRoom } from "@/redux/slices/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { fetchHotel } from "@/redux/slices/hotelsSlice";
import BookingForm from "@/components/BookingForm";
import BookingFormModal from "@/components/BookingFormModal";

const renderFeaturesList = (features: any) => {
  if (!features) return null;

  const featureNames: Record<string, string> = {
    air_conditioning: "Air Conditioning",
    attached_bathroom: "Attached Bathroom",
    balcony: "Balcony",
    double_bed: "Double Bed",
    geyser: "Geyser",
    heating: "Heating",
    king_bed: "King Bed",
    room_service: "Room Service",
    tv: "TV"
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {Object.entries(features).map(([key, value]) => {
        if (key === "_id" || !value) return null;
        return (
          <div key={key} className="flex items-center">
            <CheckIcon className="h-4 w-4 text-hotel-blue mr-2" />
            <span className="text-gray-600">{featureNames[key] || key}</span>
          </div>
        );
      })}
    </div>
  );
};

const RoomDetails = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { room, loading, error } = useSelector((state: RootState) => state.room);
  const { hotel } = useSelector((state: RootState) => state.hotel);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRoomById = () => {
      dispatch(fetchRoom({ hotelId, roomId }));
      dispatch(fetchHotel(hotelId)).unwrap();
    };

    fetchRoomById();
  }, [roomId]);

  const handleBookNow = () => {
    setShowForm(true);
  };

  const closehandler = () =>{
    setShowForm(false);
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-hotel-blue mb-4">Room Not Found</h2>
            <p className="text-gray-600 mb-6">The room you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="bg-hotel-blue hover:bg-hotel-dark-blue">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-hotel-blue hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Image */}
            <div>
              <div className="relative rounded-lg overflow-hidden h-[400px]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {!room.availability && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white border-0">
                      Not Available
                    </Badge>
                  </div>
                )}
                {room.discount && room.discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-hotel-gold text-black border-0">
                      {room.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Room Details */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-hotel-blue">{room.name}</h1>
                </div>
                <p className="text-gray-600 mt-2">{room.description}</p>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{room.capacity} guests max</span>
                </div>
                {room.adults !== undefined && room.children !== undefined && (
                  <div className="flex items-center gap-2">
                    <span>{room.adults} adults</span>
                    <span>•</span>
                    <span>{room.children} children</span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-hotel-blue mb-2">Room Amenities</h2>
                {renderFeaturesList(room.features)}
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-hotel-blue">${room.price}</span>
                      {room.discount && room.discount > 0 && (
                        <span className="text-lg text-red-500 line-through">
                          ${Math.round(room.price + (room.price * room.discount / 100))}
                        </span>
                      )}
                      <span className="text-gray-600">/ night</span>
                    </div>
                  </div>

                  <Button
                    className="bg-hotel-blue hover:bg-hotel-dark-blue"
                    disabled={!room.availability}
                    onClick={handleBookNow}
                  >
                    {!room.availability ? "Not Available" : "Book Now"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-[400px]">
              <BookingFormModal hotel={hotel} room={room} closeModal={closehandler} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RoomDetails;
