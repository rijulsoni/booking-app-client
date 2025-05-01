import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { fetchAvailableRooms } from "@/redux/slices/searchHotelSlice"

const SearchBox = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialState = location.state || {}

  const [destination, setDestination] = useState(initialState.destination || "")
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    initialState.checkIn ? new Date(initialState.checkIn) : undefined
  )
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    initialState.checkOut ? new Date(initialState.checkOut) : undefined
  )
  const [guests, setGuests] = useState(initialState.guests || "1")

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut || !guests) return

    dispatch(
      fetchAvailableRooms({
        destination,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests
      })
    )

    navigate("/hotels", {
      state: {
        destination,
        checkIn,
        checkOut,
        guests,
        autoSearch: true
      }
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full mx-auto animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <Input
            placeholder="Where are you going?"
            className="w-full text-black"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal text-black",
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
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal text-black",
                  !checkOut && "text-muted-foreground"
                )}
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
                className="text-black"
                disabled={(date) => !checkIn || date <= checkIn || date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <div className="flex space-x-2">
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="w-full text-black">
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
            <Button
              className="bg-hotel-blue hover:bg-hotel-dark-blue"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox
