import api from '@/lib/api'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
interface Hotel {
    _id: string
    address: string
    city: string
    country: string
    created_at: string | null
    updated_at: string | null
    description: string
    image: string
    isFeatured: boolean
    is_featured: boolean
    name: string
    rating: number
    state: string
    user_id: string
    zip: string
    gallery_images: []
}

interface HotelState {
    hotel: Hotel | null
    amenities: any[] | null  // Assuming amenities is an array
    loading: boolean
    error: string | null
}

const initialState: HotelState = {
    hotel: null,
    amenities: null, // Added this to match the state definition
    loading: false,
    error: null
}

export const fetchHotel = createAsyncThunk<Hotel, string, { rejectValue: string }>(
    'hotel/fetchHotel',
    async (hotelId, { rejectWithValue }) => {
        try {
            const response = await api.get<Hotel>(`/hotels/${hotelId}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || 'Failed to fetch hotel'
            )
        }
    }
)

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        clearHotel: (state) => {
            state.hotel = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotel.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchHotel.fulfilled, (state, action: PayloadAction<Hotel>) => {
                state.hotel = action.payload.hotel
                state.amenities = action.payload.amenities
                state.loading = false
                state.error = null
            })
            .addCase(fetchHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Something went wrong'
            })
    }
})

export const { clearHotel } = hotelSlice.actions

export default hotelSlice.reducer
