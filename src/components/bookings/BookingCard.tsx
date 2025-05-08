
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Ticket, Users } from "lucide-react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { cancelBooking, fetchMyBookings } from "@/redux/slices/myBookingSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface BookingProps {
  _id: string;
  hotel: object;
  room: object;
  check_in: string;
  check_out: string;
  guests: string;
  status: "confirmed" | "completed" | "cancelled";
  cancellable: boolean;
  price: number;
  total_price: number;
}

export const BookingCard: React.FC<BookingProps> = ({
  _id,
  hotel,
  room,
  check_in,
  check_out,
  guests,
  status,
  total_price,
}) => {
  const dispatch = useDispatch()
  const getStatusColor = () => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusProgress = () => {
    switch (status) {
      case "confirmed":
        return 33;
      case "completed":
        return 100;
      case "cancelled":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusIndicatorColor = () => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleViewDetails = (bookingId: string) => {
    const url = `http://localhost:3000/bookings/${bookingId}/download_pdf`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `booking-${bookingId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      toast.success("Your booking has been cancelled successfully.");
      dispatch(fetchMyBookings());
    } catch {
      toast.error("Failed to cancel booking.");
    }
  };


  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 h-48 md:h-auto relative">
            <img
              src={room.image || "/placeholder.svg"}
              alt={room.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <Badge className={`absolute top-3 right-3 ${getStatusColor()} font-medium px-3 py-1 shadow-sm`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div className="flex-1 p-4 md:p-6">
            <div className="mb-4">
              <h3 className="font-serif text-xl md:text-2xl text-hotel-primary mb-1">{hotel.name}</h3>
              <p className="text-gray-600 mb-2">{room.name}</p>
              <Progress 
                value={getStatusProgress()} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  <span className="font-medium">Check-in:</span> {check_in}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  <span className="font-medium">Check-out:</span> {check_out}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  <span className="font-medium">Booking ID:</span> {_id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  <span className="font-medium">Guests:</span> {guests}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <div className="text-hotel-primary font-bold text-lg">
                ${total_price.toFixed(2)}
              </div>
              
              <div className="flex gap-2">
                <Button  onClick={() => handleViewDetails(_id)} variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  View Details
                </Button>
                
                {status === "confirmed" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-0 shadow-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel your booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Please check our cancellation policy for any fees that might apply.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-200">Go Back</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-sm"
                          onClick={() => handleCancelBooking(_id)}
                        >
                          Cancel Booking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
