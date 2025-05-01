
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, CheckIcon, MapPin, Star, Users, ArrowLeft, Images } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotel } from "@/redux/slices/hotelsSlice";
import { RootState } from "@/redux/store/store";
import GalleryModal from "@/components/GalleryModal";
import { fetchAllRooms } from "@/redux/slices/allRoomsSlice";
import { all } from "axios";
import BookingForm from "@/components/BookingForm";
import HotelHeader from "@/components/HotelHeader";
import HotelGallery from "@/components/HotelGallery";
import HotelInfoTabs from "@/components/HotelInfoTabs";

const HotelDetails = () => {
  const { id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const dispatch = useDispatch();
  const { hotel, amenities, loading, error } = useSelector((state: RootState) => state.hotel);
  const { rooms } = useSelector((state: RootState) => state.allRooms)
  console.log(hotel)

  useEffect(() => {
    const fetchHotelById = async () => {
      await Promise.all([
        dispatch(fetchHotel(id)).unwrap(),
        dispatch(fetchAllRooms(id)).unwrap(),
      ]);
    };

    fetchHotelById();
  }, [id]);
console.log(rooms)
  const handleBooking = () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      toast.error("Please select room, check-in and check-out dates");
      return;
    }
    console.log(rooms)

    const selectedRoomDetails = rooms?.find((room: any) => room._id === selectedRoom);


    // In a real app, this would send data to an API
    toast.success(`Booking successful! ${selectedRoomDetails?.name} has been reserved.`);

    // Redirect to a confirmation page (would be implemented in a real app)
    console.log("Booking details:", {
      hotelId: hotel?.id,
      roomId: selectedRoom,
      roomName: selectedRoomDetails?.name,
      checkIn: format(checkIn, "MMM dd, yyyy"),
      checkOut: format(checkOut, "MMM dd, yyyy"),
      guests,
      totalPrice: selectedRoomDetails?.price *
        Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
    });
  };
  const startingPrice = rooms?.length > 0 ? Math.min(...rooms.map((room: Room) => room.price)) : null;
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

  if (!hotel) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-hotel-blue mb-4">Hotel Not Found</h2>
            <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
            <Link to="/hotels">
              <Button className="bg-hotel-blue hover:bg-hotel-dark-blue">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Hotels
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!selectedRoom || !checkIn || !checkOut) return null;

    const selectedRoomDetails = rooms?.find((room: any) => room._id === selectedRoom);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));

    return selectedRoomDetails?.price * nights;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Link to="/hotels" className="inline-flex items-center text-hotel-blue hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all hotels
          </Link>

          {/* Hotel Header */}
          <HotelHeader hotel={hotel} startingPrice={startingPrice} />

          {/* Hotel Gallery */}
          <HotelGallery hotel={hotel} />



          <div className="flex flex-col lg:flex-row gap-8">
            {/* Hotel Info */}
            <HotelInfoTabs selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} hotel={hotel} amenities={amenities} rooms={rooms} />

            {/* Booking Form */}
            <BookingForm
              rooms={rooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              guests={guests}
              setGuests={setGuests}
              hotelId={id}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetails;
//     reviews: [
  //       {
  //         id: 1,
  //         user: "Sarah J.",
  //         rating: 5,
  //         comment: "Absolutely stunning property with amazing service. The views are breathtaking and the spa treatments were excellent.",
  //         date: "March 15, 2025"
  //       },
  //       {
  //         id: 2,
  //         user: "Michael T.",
  //         rating: 4,
  //         comment: "Beautiful hotel with great amenities. The only downside was the restaurant was a bit overpriced for the quality.",
  //         date: "February 20, 2025"
  //       },
  //       {
  //         id: 3,
  //         user: "Emma L.",
  //         rating: 5,
  //         comment: "Perfect getaway for our anniversary. Staff went above and beyond to make our stay special.",
  //         date: "January 5, 2025"
  //       }
  //     ]