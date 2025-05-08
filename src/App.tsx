import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Deals from "./pages/Deals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { RootState } from "./redux/store/store";
import { fetchUser } from "./redux/slices/userSlice";
import RoomDetails from "./pages/RoomDetails";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBooking";
import PrivateRoute from "./pages/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token && !userInfo) {
      dispatch(fetchUser());
    }
  }, [userInfo, dispatch]);
  

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/hotels/:hotelId/room/:roomId" element={<RoomDetails />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bookings" element={<MyBookings />} />
            </Route>
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
