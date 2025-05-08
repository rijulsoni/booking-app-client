import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ArrowLeft, Filter } from "lucide-react";
import { BookingCard } from "@/components/bookings/BookingCard";
import { BookingFilter } from "@/components/bookings/BookingFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { fetchMyBookings } from "@/redux/slices/myBookingSlice";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortOption, setSortOption] = useState("date-desc");
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { bookings, loading, error } = useSelector((state: RootState) => state.myBooking);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortOption) {
      case "date-desc":
        return new Date(b.check_in).getTime() - new Date(a.check_in).getTime();
      case "date-asc":
        return new Date(a.check_in).getTime() - new Date(b.check_in).getTime();
      case "price-desc":
        return b.total_price - a.total_price;
      case "price-asc":
        return a.total_price - b.total_price;
      default:
        return 0;
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-lg text-gray-600">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        Error loading bookings. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-serif text-hotel-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-600"
        >
          My Bookings
        </motion.h1>
        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300 hover:shadow-lg"
          onClick={() => navigate("/")}
        >
          Find New Hotels
        </Button>
      </div>

      {/* Back to Home Button */}
      <div className="mb-4 flex items-center space-x-2 text-sm text-blue-600 hover:underline cursor-pointer">
        <ArrowLeft className="h-4 w-4" />
        <Link to="/">Back to Home</Link>
      </div>

      {/* Mobile Drawer for Filter/Sort */}
      <div className="md:hidden mb-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>Filter & Sort</span>
              <Filter className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <BookingFilter
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Filter UI */}
      <div className="hidden md:block mb-6">
        <BookingFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>

      {/* Bookings List or Empty State */}
      {sortedBookings.length > 0 ? (
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedBookings.map((booking) => (
            <motion.div key={booking._id} variants={itemVariants}>
              <BookingCard {...booking} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16 px-8 bg-white rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-serif text-hotel-primary mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500 mb-8">
            You don't have any{" "}
            {activeTab !== "all"
              ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
              : ""}{" "}
            bookings yet.
          </p>
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300 hover:shadow-lg"
            onClick={() => navigate("/hotels")}
          >
            Browse Hotels
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MyBookings;
