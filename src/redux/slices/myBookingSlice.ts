import api from "@/lib/api"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

// Interfaces
interface MyBooking {
    status: string
    hotel: object
    room: object
    check_in: Date
    check_out: Date
    guests: number
    nights: number
    total_price: number
    guest_name: string
    guest_email: string
    guest_phone: string
    guest_special_requests: string
    paypal_order_id: string
}

interface MyBookingState {
    bookings: MyBooking[]
    loading: boolean
    error: string | null
}

// Initial State
const initialState: MyBookingState = {
    bookings: [],
    loading: false,
    error: null
}

// Async Thunk with try-catch
export const fetchMyBookings = createAsyncThunk<
    MyBooking[],
    void,
    { rejectValue: string }
>(
    'myBooking/fetchMyBookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/bookings')
            console.log(response.data)
            return response.data
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch bookings'
            return rejectWithValue(message)
        }
    }
)

export const cancelBooking = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>(
    'myBooking/cancelBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            await api.put(`/bookings/${bookingId}/cancel`)
            return
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Failed to cancel booking'
            return rejectWithValue(message)
        }
    }
)

const myBookingSlice = createSlice({
    name: 'myBooking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyBookings.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMyBookings.fulfilled, (state, action: PayloadAction<MyBooking[]>) => {
                state.bookings = action.payload
                state.loading = false
            })
            .addCase(fetchMyBookings.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as string) ?? action.error.message ?? 'Something went wrong'
            })
    }
})

export default myBookingSlice.reducer
