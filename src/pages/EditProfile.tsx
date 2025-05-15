import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
    Phone,
    ArrowLeft,
    Mail,
    User,
    FileText,
    ImagePlus,
    Loader,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { editUserProfile, fetchUser } from "@/redux/slices/userSlice";

const EditProfile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { userInfo , loading } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState(() => ({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        mobile_number: userInfo?.mobile_number || "",
        bio: userInfo?.bio || "",
        profile_image: userInfo?.profile_image || "",
    }));

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    profile_image: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.mobile_number.length !== 10) {
            toast({
                title: "Invalid Mobile Number",
                description: "Please enter a 10-digit mobile number.",
                variant: "destructive",
            });
            return;
        }

        try {
            await dispatch(editUserProfile({ id: userInfo?._id, ...formData })).unwrap();

            toast({
                title: "Profile Updated",
                description: "Your profile has been updated successfully.",
            });
            await dispatch(fetchUser()).unwrap();
            setTimeout(() => {
                navigate("/profile");
            }, 500);
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="container mx-auto max-w-2xl py-6">
                <Button
                    variant="ghost"
                    className="mb-6 group hover:bg-blue-50"
                    onClick={() => navigate("/profile")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
                    Back to Profile
                </Button>

                <Card className="shadow-md">
                    <CardHeader className="text-center pb-6 bg-blue-50">
                        <div className="mx-auto mb-4 relative">
                            <Avatar className="h-24 w-24 mx-auto ring-4 ring-white shadow-sm">
                                <AvatarImage
                                    src={formData.profile_image}
                                    alt={userInfo?.name || "User"}
                                />
                                <AvatarFallback className="text-2xl font-bold bg-blue-600 text-white">
                                    {(userInfo?.name || "U").substring(0, 2).toUpperCase()}
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
                            Edit Profile
                        </CardTitle>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="pt-6 space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-600" />
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-blue-600" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled
                                    className="bg-gray-100"
                                />
                                <p className="text-xs text-gray-500">
                                    Contact support to change your email address
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mobile_number" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-blue-600" />
                                    Mobile Number
                                </Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700 text-sm font-medium">+91</span>
                                    <Input
                                        id="mobile_number"
                                        name="mobile_number"
                                        type="text"
                                        maxLength={10}
                                        placeholder="Add your mobile number"
                                        value={formData.mobile_number}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, "");
                                            setFormData((prev) => ({
                                                ...prev,
                                                mobile_number: numericValue,
                                            }));
                                        }}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Tell us about yourself"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="bg-gray-50 p-6 flex flex-col sm:flex-row gap-4">
                            <Button
                                type="submit"
                                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                                onClick={() => navigate("/profile")}
                            >
                                Cancel
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default EditProfile;
