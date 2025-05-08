import React, { useState, useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { toast } from "@/hooks/use-toast";

export const PaypalPaymentForm: React.FC<{
  guestName: string;
  onNext: () => void;
  onBack: () => void;
  formData: any;
}> = ({ guestName, onNext, onBack, formData }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const {
    hotelId,
    roomId,
    checkIn,
    checkOut,
    guests,
    roomPrice,
    nights,
    totalPrice,
  } = useSelector((state: RootState) => state.booking);

  const initialOptions = {
    clientId: "AQoUFQ1OynTIj33axhsx2gdbtgNLRyWtb_YL8yvEMj-9SOgNCzHUqfMGCapuJ-VzyFm5NIn7cm0qvxnr",
    enableFunding: "venmo",
    disableFunding: "",
    buyerCountry: "US",
    currency: "USD",
    dataPageType: "product-details",
    components: "buttons",
    dataSdkIntegrationSource: "developer-studio",
  };

  const createOrder = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.post("/bookings", {
        booking: {
          hotel_id: hotelId,
          room_id: roomId,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          roomPrice,
          nights,
          total_price: totalPrice,
          guest_name: guestName,
          guest_email: formData.email,
          guest_phone: formData.phone,
          guest_special_requests: formData.specialRequests,
          guest_is_subscribed: formData.isSubscribed,
        },
      });

      if (!res.data.paypal_order_id) {
        throw new Error("No order ID returned from server");
      }

      return res.data.paypal_order_id;
    } catch (err) {
      console.error(err);
      setMessage("Error creating PayPal order.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [hotelId, roomId, checkIn, checkOut, guests, roomPrice, nights, totalPrice]);

  const onApprove = useCallback(
    async (data: any, actions: any) => {
      setIsLoading(true);
      try {
        setIsPaymentCompleted(true);
        const res = await api.post(`/orders/${data.orderID}/capture`);
        const orderData = res.data;

        if (orderData.status !== "success" || !orderData.payment) {
          throw new Error("Payment not confirmed. Please try again.");
        }

        const { payment } = orderData;
        const { transaction_id, amount, payment_status, payment_date } = payment;

        toast({
          title: "Payment Successful",
          description: `Transaction ${transaction_id} confirmed on ${payment_date} for $${amount} USD.`,
        });

        setMessage(`Transaction ${payment_status}: ${transaction_id}`);
        onNext();
      } catch (err: any) {
        console.error(err);
        const errorMessage = err?.message || "Unexpected error occurred";
        toast({
          title: "Payment Failed",
          description: errorMessage,
        });
        setMessage(`Error: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    },
    [guestName, onNext]
  );

  const onError = useCallback((err: any) => {
    console.error(err);
    const errorMessage =
      typeof err === "string"
        ? err
        : err?.message || "An error occurred during payment.";
    toast({
      title: "Payment Error",
      description: errorMessage,
    });
    setMessage(`Payment error: ${errorMessage}`);
  }, []);

  return (
    <div className="space-y-4">
      {!isPaymentCompleted && (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      )}

      {isLoading && (
        <div className="text-sm text-center text-blue-600 animate-pulse">
          Processing payment, please wait...
        </div>
      )}

      {message && (
        <div className="text-sm text-muted-foreground border rounded p-2 bg-gray-50">
          {message}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        {(message.startsWith("Error") || message.startsWith("Payment error")) && (
          <Button onClick={() => setMessage("")} disabled={isLoading}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};
