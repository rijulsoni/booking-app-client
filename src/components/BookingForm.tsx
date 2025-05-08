import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails } from "@/redux/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";

interface BookingFormProps {
    rooms: any[] | any;
    selectedRoom: string | null;
    setSelectedRoom: (roomId: string | null) => void;
    checkIn: Date | undefined;
    setCheckIn: (date: Date | undefined) => void;
    checkOut: Date | undefined;
    setCheckOut: (date: Date | undefined) => void;
    guests: string;
    setGuests: (guests: string) => void;
    hotelId: string | undefined;
    hotelName: string | undefined;
}

const BookingForm = ({
    rooms,
    selectedRoom,
    setSelectedRoom,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    hotelId,
    hotelName,
}: BookingFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(rooms)
const { userInfo } = useSelector((state: RootState) => state.user);
    const selectedRoomDetails = rooms?.find((room: any) => room._id === selectedRoom);
    const nights = checkIn && checkOut
        ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
        : 0;

    const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

    const calculateTotalPrice = () => {
        if (!selectedRoomDetails || nights <= 0) return null;

        // Base price and discounted price calculation
        const basePrice = selectedRoomDetails.price * nights;
        const discount = selectedRoomDetails.discount || 0;
        const discountedPrice = basePrice - (basePrice * discount / 100);

        const gst = discountedPrice * 0.18;

        // Platform fee (20)
        const platformFee = 20;

        // Total price including discount, GST, and platform fee
        const totalPrice = discountedPrice + gst + platformFee;

        return totalPrice.toFixed(2); // Return the total price formatted to two decimal places
    };

    const handleBooking = () => {
        if (!selectedRoom || !checkIn || !checkOut) {
            toast.error("Please select room, check-in and check-out dates");
            return;
        }

        if (!userInfo) {
            toast.error("Please login to book a room");
            navigate("/signin");
            return;
        }

        toast.success("Redirecting to checkout page");

        const selectedRoomDetails = rooms?.find((room) => room._id === selectedRoom);
        const nights = checkIn && checkOut
            ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
            : 0;

        if (selectedRoomDetails && nights > 0) {
            // Base price and discounted price calculation
            const basePrice = selectedRoomDetails.price * nights;
            const discount = selectedRoomDetails.discount || 0;
            const discountedPrice = basePrice - (basePrice * discount / 100);

            // GST calculation (18%)
            const gst = discountedPrice * 0.18;

            // Platform fee (20)
            const platformFee = 20;

            // Total price including discount, GST, and platform fee
            const totalPrice = discountedPrice + gst + platformFee;

            // Dispatch booking details
            dispatch(setBookingDetails({
                hotelId,
                hotelName,
                roomId: selectedRoom,
                roomName: selectedRoomDetails.name,
                roomType: selectedRoomDetails.room_type,
                roomImage: selectedRoomDetails.image,
                checkIn,
                checkOut,
                guests,
                roomPrice: selectedRoomDetails.price,
                nights,
                totalPrice: totalPrice.toFixed(2), // formatted total price
                gst: gst.toFixed(2), // formatted GST
                platformFee: platformFee.toFixed(2), // formatted platform fee
            }));

            setTimeout(() => {
                navigate('/checkout');
            }, 1000);
        }
    };
    console.log(rooms)

    return (
        <div className="lg:w-1/3" id="booking-form">
            {rooms?.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold text-hotel-blue mb-4">Book Your Stay</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Room</label>
                            <Select value={selectedRoom?.toString()} onValueChange={setSelectedRoom}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a room" />
                                </SelectTrigger>
                                <SelectContent>
                                    {rooms
                                        ?.filter((room: any) => room.availability === true)
                                        ?.map((room: any) => (
                                            <SelectItem key={room._id} value={room._id.toString()}>
                                                {room.name} - {formatPrice(room.price)}/night
                                            </SelectItem>
                                        ))}

                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkIn && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkIn ? format(checkIn, "MMM dd, yyyy") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={checkIn}
                                        onSelect={(date) => {
                                            setCheckIn(date);
                                            if (checkOut && date && checkOut <= date) {
                                                setCheckOut(undefined);
                                            }
                                        }}
                                        initialFocus
                                        disabled={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkOut && "text-muted-foreground",
                                            !checkIn && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!checkIn}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkOut ? format(checkOut, "MMM dd, yyyy") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={checkOut}
                                        onSelect={setCheckOut}
                                        initialFocus
                                        disabled={(date) => !checkIn || date <= checkIn || date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                            <Select value={guests} onValueChange={setGuests}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Guest</SelectItem>
                                    <SelectItem value="2">2 Guests</SelectItem>
                                    <SelectItem value="3">3 Guests</SelectItem>
                                    <SelectItem value="4">4 Guests</SelectItem>
                                    <SelectItem value="5">5+ Guests</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedRoomDetails && nights > 0 && (
                            <>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Room price</span>
                                    <span className="text-gray-800">{formatPrice(selectedRoomDetails.price)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">{nights} nights</span>
                                    <span className="text-gray-800">
                                        {nights} x {formatPrice(selectedRoomDetails.price)}
                                    </span>
                                </div>
                                {selectedRoomDetails.discount > 0 && (
                                    <div className="flex justify-between mb-2 text-green-600">
                                        <span>Discount ({selectedRoomDetails.discount}%)</span>
                                        <span>
                                            -{(selectedRoomDetails.price * nights * selectedRoomDetails.discount / 100).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">GST (18%)</span>
                                    <span className="text-gray-800">
                                        {formatPrice(Number((selectedRoomDetails.price * nights * 0.18).toFixed(2)))}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600">Platform Fee</span>
                                    <span className="text-gray-800">₹ 20</span>
                                </div>
                                <div className="flex justify-between mb-4 font-semibold text-lg">
                                    <span>Total</span>
                                    <span className="text-hotel-blue">{formatPrice(Number(calculateTotalPrice()))}</span>
                                </div>
                            </>
                        )}

                        <Button
                            onClick={handleBooking}
                            className="w-full bg-hotel-blue text-white mt-4"
                            disabled={!selectedRoom || !checkIn || !checkOut}
                        >
                            Book Now
                        </Button>
                    </div>
                </div>
            ) : (
                <p>No rooms available</p>
            )}
        </div>
    );
};

export default BookingForm;
