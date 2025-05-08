import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { formatDate } from "@/lib/dateFormat"
import { useDispatch } from "react-redux"
import { setBookingDetails } from "@/redux/slices/bookingSlice"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const BookingFormModal = ({ room, closeModal, hotel }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)

  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(1)

  const navigate = useNavigate();

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut - checkIn)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  const priceDetails = () => {
    const nights = calculateNights()
    const pricePerNight = room.price
    const basePrice = pricePerNight * nights
    const discount = room.discount || 0
    const discountedPrice = basePrice - (basePrice * discount / 100)
    const gst = discountedPrice * 0.18
    const platformFee = 20
    const total = (discountedPrice + gst + platformFee).toFixed(2)

    return {
      nights,
      pricePerNight,
      discountedPrice,
      gst,
      platformFee,
      total
    }
  }

  const handleBooking = () => {
    const {
      nights,
      pricePerNight,
      gst,
      platformFee,
      total
    } = priceDetails()
    if (!userInfo) {
        toast.error("Please login to book a room");
        navigate("/signin");
        return;
    }
    dispatch(setBookingDetails({
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: room.id,
      roomName: room.name,
      roomType: room.room_type,
      roomImage: room.image,
      checkIn,
      checkOut,
      guests,
      roomPrice: pricePerNight,
      nights,
      gst: gst.toFixed(2),
      platformFee: platformFee.toFixed(2),
      totalPrice: total
    }))
    toast.success("Redirecting to checkout page");

    setTimeout(() => {
        navigate('/checkout');
    }, 1000);
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-hotel-blue mb-4">Book {room.name}</h2>

      {/* Check-in Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIn ? formatDate(checkIn) : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={(date) => {
                setCheckIn(date)
                if (checkOut && date && checkOut <= date) {
                  setCheckOut(null)
                }
              }}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOut ? formatDate(checkOut) : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={(date) => setCheckOut(date)}
              initialFocus
              disabled={(date) => !checkIn || date <= checkIn || date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Number of Guests */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Price Breakdown */}
      {checkIn && checkOut && (
        <div className="mb-4 text-sm text-gray-700">
          <p>Nights: <strong>{priceDetails().nights}</strong></p>
          <p>Room Price: ₹{priceDetails().pricePerNight} x {priceDetails().nights} nights</p>
          <p>Discounted Price: ₹{priceDetails().discountedPrice.toFixed(2)}</p>
          <p>GST (18%): ₹{priceDetails().gst.toFixed(2)}</p>
          <p>Platform Fee: ₹{priceDetails().platformFee.toFixed(2)}</p>
          <p className="font-semibold mt-2">Total Price: ₹{priceDetails().total}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between">
        <Button
          className="bg-hotel-blue hover:bg-hotel-dark-blue"
          onClick={handleBooking}
          disabled={!checkIn || !checkOut}
        >
          Confirm Booking
        </Button>
        <Button
          variant="outline"
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={closeModal}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default BookingFormModal
