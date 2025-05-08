import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BookingState {
    hotelName: string | null;
    hotelId: string | null;
    roomId: string | null;
    roomName: string | null;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: string;
    roomPrice: number | null;
    nights: number | null;
    totalPrice: string | null;
    roomType: string | null;
    roomImage: string | null;
    gst: string | null;
    platformFee: string | null;
}

const initialState: BookingState = {
    hotelName: null,
    hotelId: null,
    roomId: null,
    roomName: null,
    checkIn: null,
    checkOut: null,
    guests: '1',
    roomPrice: null,
    nights: null,
    totalPrice: null,
    roomType: null,
    roomImage: null,
    gst: null,
    platformFee: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingDetails(state, action: PayloadAction<Partial<BookingState>>) {
            return { ...state, ...action.payload }
        },
        clearBooking(state) {
            return initialState
        },
    },
});

export const { setBookingDetails, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
