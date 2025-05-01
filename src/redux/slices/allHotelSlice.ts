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
  hotels: Hotel[]
  amenities: any[] | null
  loading: boolean
  error: string | null
}

const initialState: HotelState = {
  hotel: null,
  hotels: [],
  amenities: null,
  loading: false,
  error: null
}

// ✅ Fetch a single hotel
export const fetchHotel = createAsyncThunk<
  { hotel: Hotel; amenities: any[] },
  string,
  { rejectValue: string }
>('hotel/fetchHotel', async (hotelId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/hotels/${hotelId}`)
    return response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || 'Failed to fetch hotel'
    )
  }
})

// ✅ Fetch all hotels
export const fetchAllHotels = createAsyncThunk<
  Hotel[],
  void,
  { rejectValue: string }
>('hotel/fetchAllHotels', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/hotels')
    return response.data.hotels || response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || 'Failed to fetch all hotels'
    )
  }
})

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    clearHotel: (state) => {
      state.hotel = null
      state.amenities = null
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
      .addCase(fetchHotel.fulfilled, (state, action) => {
        state.hotel = action.payload.hotel
        state.amenities = action.payload.amenities
        state.loading = false
        state.error = null
      })
      .addCase(fetchHotel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
      .addCase(fetchAllHotels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllHotels.fulfilled, (state, action: PayloadAction<Hotel[]>) => {
        state.hotels = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchAllHotels.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export const { clearHotel } = hotelSlice.actions

export default hotelSlice.reducer
