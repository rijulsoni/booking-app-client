import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfo {
  name?: string;
  email?: string;
  avatar?: string;
}

interface UserAvatarProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

const UserAvatar = ({ userInfo, onLogout }: UserAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className="relative h-8 w-8 rounded-full border-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer overflow-hidden"
        >
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage
              src={userInfo?.profile_picture_url}
              alt={userInfo?.name || "User"}
            />
            <AvatarFallback>
              {userInfo?.name
                ? userInfo.name.split(" ").map((n) => n[0].toUpperCase()).join("")
                : "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;