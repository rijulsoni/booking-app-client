import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Edit, Calendar, Mail, ArrowLeft, ImagePlus, Biohazard, Database, DatabaseZap, User2Icon, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { updateProfileImage } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [profileImage, setProfileImage] = useState<string>(userInfo?.profile_image);
useEffect(() => {
    setProfileImage(userInfo?.profile_picture_url);
}, [userInfo]);
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImage(reader.result as string);
            const formData = new FormData();
            formData.append('profile_picture', file);

            dispatch(updateProfileImage(formData))
          };
          reader.readAsDataURL(file);
        }
      };
      

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-50 p-4"
        >
            <div className="container mx-auto max-w-2xl py-6">
                <motion.div variants={itemVariants}>
                    <Button
                        variant="ghost"
                        className="mb-6 group hover:bg-blue-50"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
                        Back to Home
                    </Button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                >
                    <Card className="shadow-md overflow-hidden">
                        <CardHeader className="text-center pb-6 bg-blue-50">
                            <div className="mx-auto mb-4 relative">
                                <Avatar className="h-24 w-24 mx-auto ring-4 ring-white shadow-sm">
                                    <AvatarImage src={profileImage} alt={userInfo?.name} />
                                    <AvatarFallback className="text-2xl font-bold bg-blue-600 text-white">
                                        {userInfo?.name?.split(" ").map((name) => name[0]).join("").toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <label
                                    htmlFor="profile-image"
                                    className="absolute bottom-0 right-1/2 translate-x-12 translate-y-1 bg-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-gray-100 transition-colors"
                                >
                                    <ImagePlus size={16} className="text-blue-600" />
                                    <input
                                        type="file"
                                        id="profile-image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <CardTitle className="text-2xl font-bold text-blue-800">
                                {userInfo.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <div className="space-y-5">
                                <div className="flex items-start space-x-3">
                                    <Mail className="text-blue-600 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="font-medium break-all text-gray-900">{userInfo?.email}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-start space-x-3">
                                    <Phone className="text-blue-600 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Mobile Number</p>
                                        {userInfo?.mobile_number ? (
                                            <p className="font-medium text-gray-900">{userInfo?.mobile_number}</p>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">
                                                No mobile number added
                                                <span className="block text-blue-600 text-xs mt-1 font-medium">
                                                    Add one in Edit Profile
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-start space-x-3">
                                <FileText className="text-blue-600 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bio</p>
                                        <p className="font-medium text-gray-900">
                                            {userInfo?.bio}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-start space-x-3">
                                    <Calendar className="text-blue-600 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(userInfo?.created_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="bg-gray-50 p-6 flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => navigate("/profile/edit")}
                                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Edit className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full sm:flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                                onClick={() => navigate("/bookings")}
                            >
                                View My Bookings
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default UserProfile;