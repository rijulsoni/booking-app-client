
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BedDouble, Menu, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "./UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { logoutUser } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userInfo, status } = useSelector((state: RootState) => state.user);
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation('/signin');
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <BedDouble className="h-8 w-8 text-hotel-blue mr-2" />
          <span className="text-2xl font-semibold text-hotel-blue">StayAweigh</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {["hotels", "bookings", "about", "contact"].map((path) => (
            <Link
              key={path}
              to={`/${path}`}
              className="text-gray-700 hover:text-hotel-blue transition-colors capitalize"
            >
              {path === "hotels" ? "Browse Hotels" :
                path === "bookings" ? "My Bookings" :
                  path === "about" ? "About Us" :
                    "Contact"}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          {status === "loading" ? (
            <>
              <Skeleton className="w-20 h-8 md:w-24 md:h-9" />
              <Skeleton className="w-20 h-8 md:w-24 md:h-9" />
            </>
          ) : userInfo ? (
            <UserAvatar userInfo={userInfo} onLogout={handleLogout} />
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="hidden md:flex bg-hotel-blue hover:bg-hotel-dark-blue">
                  Register
                </Button>
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

