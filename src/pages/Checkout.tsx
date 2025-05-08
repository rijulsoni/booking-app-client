import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { GuestInfoForm } from "@/components/checkout/GuestInfoForm";
import { PaypalPaymentForm } from "@/components/checkout/PayPalPaymentForm";
import { ConfirmationSection } from "@/components/checkout/ConfirmationSection";
import { BookingSummary } from "@/components/checkout/BookingSummary";
import { formatDate } from "@/lib/dateFormat";

const steps = [
    { id: 1, name: "Review" },
    { id: 2, name: "Guest Info" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Confirmation" },
];

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const {
        hotelId,
        hotelName,
        roomId,
        roomType,
        roomImage,
        roomName,
        checkIn,
        checkOut,
        guests,
        roomPrice,
        nights,
        totalPrice,
        gst,
        platformFee
    } = useSelector((state: RootState) => state.booking);

    const { toast } = useToast();
    const bookingNumber = "HOTEL-" + Math.floor(10000 + Math.random() * 90000);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: "",
        isSubscribed: false
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });

            if (currentStep === 2) {
                toast({
                    title: "Booking Successful",
                    description: `Your booking (${bookingNumber}) has been confirmed.`,
                });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const updateFormData = (data: any) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    useEffect(() => {
        if (currentStep < 3 && formData.email) {
            localStorage.setItem('checkoutProgress', JSON.stringify({
                step: currentStep,
                formData,
                timestamp: new Date().toISOString()
            }));
        }
    }, [currentStep, formData]);

    useEffect(() => {
        const savedProgress = localStorage.getItem('checkoutProgress');
        if (savedProgress) {
            try {
                const { step, formData: savedData, timestamp } = JSON.parse(savedProgress);
                const savedTime = new Date(timestamp).getTime();
                const now = new Date().getTime();
                const hoursDiff = (now - savedTime) / (1000 * 60 * 60);

                if (hoursDiff < 24) {
                    setCurrentStep(step);
                    setFormData(savedData);
                } else {
                    localStorage.removeItem('checkoutProgress');
                }
            } catch {
                localStorage.removeItem('checkoutProgress');
            }
        }
    }, []);

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <motion.h1
                className="text-3xl md:text-4xl font-serif text-hotel-primary text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Complete Your Booking
            </motion.h1>

            <CheckoutStepper
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                        >
                            {currentStep === 0 && (
                                <div className="animate-fade-in">
                                    <h2 className="text-2xl font-serif text-hotel-primary mb-4">
                                        Review Your Booking
                                    </h2>
                                    <p className="text-gray-600 mb-8">
                                        Please review your booking details before proceeding. Make sure all information is correct.
                                    </p>

                                    <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                                        <h3 className="text-xl font-serif text-hotel-primary mb-3">
                                            {hotelName}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Room Type</p>
                                                <p className="font-medium">{roomType}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Guests</p>
                                                <p className="font-medium">
                                                    {guests}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Check-in</p>
                                                <p className="font-medium">
                                                    {formatDate(checkIn)}

                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Check-out</p>
                                                <p className="font-medium">
                                                    {formatDate(checkOut)}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <motion.button
                                                onClick={handleNext}
                                                className="bg-[#1A365D] hover:bg-slate-900 text-white px-6 py-3 rounded-md transition-colors"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Continue
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <GuestInfoForm
                                    onNext={handleNext}
                                    onBack={handleBack}
                                    formData={formData}
                                    updateFormData={updateFormData}
                                />
                            )}

                            {currentStep === 2 && (
                                <PaypalPaymentForm
                                    onNext={handleNext}
                                    onBack={handleBack}
                                    formData={formData}
                                    guestName={`${formData.firstName} ${formData.lastName}`}
                                />
                            )}

                            {currentStep === 3 && (
                                <ConfirmationSection
                                    bookingNumber={bookingNumber}
                                    hotelName={hotelName}
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    guestName={`${formData.firstName} ${formData.lastName}`}
                                    email={formData.email}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {currentStep !== 3 && (
                    <div className="lg:sticky lg:top-8 self-start">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <BookingSummary
                                hotelName={hotelName}
                                roomType={roomType}
                                roomName={roomName}
                                checkIn={formatDate(checkIn)}
                                checkOut={formatDate(checkOut)}
                                guests={guests}
                                roomPrice={roomPrice}
                                nights={nights}
                                imageUrl={roomImage}
                                totalPrice={totalPrice}
                                gst={gst}
                                platformFee={platformFee}
                            />
                            <div className="mt-6 p-4 bg-hotel-light rounded-lg border border-hotel-primary/20">
                                <h3 className="font-medium text-hotel-primary mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Secure booking guarantee
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Your booking is protected by our secure payment system. We use
                                    industry-standard encryption to protect your information.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            {currentStep < 3 && (
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>Your progress is automatically saved. You can safely return later to complete your booking.</p>
                </div>
            )}
        </div>
    );
};

export default Checkout;
