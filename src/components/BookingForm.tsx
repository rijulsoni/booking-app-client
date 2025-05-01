import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BookingFormProps {
    rooms: any[]; // Replace 'any' with proper room type if available
    selectedRoom: string | null;
    setSelectedRoom: (roomId: string | null) => void;
    checkIn: Date | undefined;
    setCheckIn: (date: Date | undefined) => void;
    checkOut: Date | undefined;
    setCheckOut: (date: Date | undefined) => void;
    guests: string;
    setGuests: (guests: string) => void;
    hotelId: string | undefined;
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
}: BookingFormProps) => {
    const calculateTotalPrice = () => {
        if (!selectedRoom || !checkIn || !checkOut) return null;

        const selectedRoomDetails = rooms?.find((room: any) => room._id === selectedRoom);
        const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));

        return selectedRoomDetails?.price * nights;
    };

    const handleBooking = () => {
        if (!selectedRoom || !checkIn || !checkOut) {
            toast.error("Please select room, check-in and check-out dates");
            return;
        }

        const selectedRoomDetails = rooms?.find((room: any) => room._id === selectedRoom);

        toast.success(`Booking successful! ${selectedRoomDetails?.name} has been reserved.`);

        console.log("Booking details:", {
            hotelId,
            roomId: selectedRoom,
            roomName: selectedRoomDetails?.name,
            checkIn: format(checkIn, "MMM dd, yyyy"),
            checkOut: format(checkOut, "MMM dd, yyyy"),
            guests,
            totalPrice: selectedRoomDetails?.price *
              Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))),
        });
    };

    return (
        <div className="lg:w-1/3" id="booking-form"> {
            rooms?.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold text-hotel-blue mb-4">Book Your Stay</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Room</label>
                            <Select value={selectedRoom?.toString()} onValueChange={(value) => setSelectedRoom(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a room" />
                                </SelectTrigger>
                                <SelectContent>
                                    {rooms?.map((room: any) => (
                                        <SelectItem key={room._id} value={room._id.toString()}>
                                            {room.name} - {room.price}/night
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
                                        variant={"outline"}
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
                                        variant={"outline"}
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

                        {calculateTotalPrice() && (
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Room price</span>
                                    <span className="text-gray-800">
                                        {rooms?.find((room: any) => room._id === selectedRoom)?.price}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">
                                        {checkIn && checkOut
                                            ? `${Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights`
                                            : "0 nights"}
                                    </span>
                                    <span className="text-gray-800">
                                        {checkIn && checkOut
                                            ? `${Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}`
                                            : "0"} x {rooms?.find((room: any) => room._id === selectedRoom)?.price}
                                    </span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span className="text-hotel-blue">{calculateTotalPrice()}</span>
                                </div>
                            </div>
                        )}

                        <Button
                            className="w-full bg-hotel-blue hover:bg-hotel-dark-blue"
                            onClick={handleBooking}
                            disabled={!selectedRoom || !checkIn || !checkOut}
                        >
                            Book Now
                        </Button>
                    </div>
                </div>) : (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold text-hotel-blue mb-4">No available rooms</h2>
                </div>
            )}
        </div>
    );
};

export default BookingForm;