import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Calendar, Users, CreditCard, Clock, CalendarClock } from "lucide-react";

interface BookingSummaryProps {
    hotelName: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: string;
    roomPrice: number;
    roomName: string;
    imageUrl: string;
    totalPrice: string;
    gst: string;
    platformFee: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
    hotelName,
    roomType,
    checkIn,
    checkOut,
    nights,
    guests,
    roomPrice,
    roomName,
    imageUrl,
    totalPrice,
    gst,
    platformFee
}) => {;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-hotel-light to-hotel-light/50 pb-2">
                    <CardTitle className="text-xl font-serif text-hotel-primary flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Booking Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="relative mb-4">
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={hotelName}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md"></div>
                        <div className="absolute bottom-0 left-0 p-3 text-white">
                            <h3 className="font-serif text-lg">{hotelName}</h3>
                            <p className="text-sm text-white/90">{roomName}</p>
                            <p className="text-sm text-white/90">{roomType}</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-center">

                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <div className="flex ">
                                        <Calendar className="h-4 w-4 mr-2 text-hotel-primary" />
                                        <span className="font-medium">Check-in</span>
                                    </div>
                                    <span>{checkIn}</span>
                                </div>

                                <div className="flex justify-between mt-1">
                                    <div className="flex ">
                                        <Calendar className="h-4 w-4 mr-2 text-hotel-primary" />
                                        <span className="font-medium">Check-out</span>
                                    </div>
                                    <span>{checkOut}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <div className="flex ">
                                        <CalendarClock className="h-4 w-4 mr-2 text-hotel-primary" />
                                        <span className="font-medium">Duration</span>
                                    </div>

                                    <span>{nights} {nights === 1 ? "night" : "nights"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-hotel-primary" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="font-medium">Guests</span>
                                    <span>
                                        {guests}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Room ({nights} {nights === 1 ? "night" : "nights"})</span>
                            <span>₹ {roomPrice} per night</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>GST (18%)</span>
                            <span>₹ {gst}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Platform Fee</span>
                            <span>₹ {platformFee}</span>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-lg text-hotel-primary">₹ {totalPrice}</span>
                        </div>
                    </div>


                    <div className="mt-6 bg-gray-50 p-3 rounded-md border border-gray-100 text-xs text-gray-600">
                        <p>
                            Rate includes all taxes and fees. Your credit card will not be charged until check-out unless otherwise stated.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};