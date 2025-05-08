import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, CalendarDays, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/dateFormat";

interface ConfirmationSectionProps {
  bookingNumber: string;
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  email: string;
}

export const ConfirmationSection: React.FC<ConfirmationSectionProps> = ({
  bookingNumber,
  hotelName,
  checkIn,
  checkOut,
  guestName,
  email
}) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Clear checkout progress from localStorage upon successful booking
    localStorage.removeItem('checkoutProgress');
  }, []);
  
  return (
    <div className="text-center py-4">
      <motion.div 
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Check className="h-10 w-10 text-green-600" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-serif text-3xl text-hotel-primary mb-3">
          Booking Confirmed!
        </h2>
        
        <Badge variant="outline" className="mb-6 bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
          Confirmation #{bookingNumber}
        </Badge>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Thank you for your reservation, <strong>{guestName}</strong>. A confirmation email has been sent to <strong>{email}</strong>.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-hotel-light rounded-lg p-6 max-w-md mx-auto mb-8 border border-hotel-primary/10 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-hotel-primary mr-2 mt-0.5" />
            <div>
              <span className="text-sm text-gray-500 block">Hotel:</span>
              <p className="font-medium">{hotelName}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CalendarDays className="h-5 w-5 text-hotel-primary mr-2 mt-0.5" />
            <div>
              <span className="text-sm text-gray-500 block">Stay:</span>
              <p className="font-medium">{formatDate(checkIn)} to {formatDate(checkOut)}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="bg-white rounded p-3 border border-dashed border-gray-300 text-center">
              <p className="text-sm text-gray-500">Have questions about your booking?</p>
              <div className="flex items-center justify-center mt-2 text-hotel-primary font-medium">
                <Phone className="h-4 w-4 mr-1" /> +1 (800) 555-0123
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button 
          onClick={() => navigate("/")}
          variant="outline"
          className="border-hotel-primary text-hotel-primary"
        >
          Back to Home
        </Button>
        <Button 
          onClick={() => navigate("/bookings")}
          className="bg-hotel-primary hover:bg-hotel-dark text-white"
        >
          View My Bookings
        </Button>
      </motion.div>

      <motion.p 
        className="text-sm text-gray-500 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Need to modify your reservation? Visit the My Bookings page or contact our customer service.
      </motion.p>
    </div>
  );
};
