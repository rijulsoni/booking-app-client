import api from '@/lib/api'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface Room {
  _id: string
  name: string
  description: string
  price: number
  maxGuests: number
  bedCount: number
  roomNumber: string
  isFeatured: boolean
  image: string
  hotelId: string
  created_at: string | null
  updated_at: string | null
}

interface FeaturedRoomsState {
  featuredRooms: Room[]
  loading: boolean
  error: string | null
}

// Initial State
const initialState: FeaturedRoomsState = {
  featuredRooms: [],
  loading: false,
  error: null,
}


export const fetchFeaturedRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  'room/fetchFeaturedRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Room[]>('/rooms/featured_room')
      console.log(response.data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch featured rooms'
      )
    }
  }
)

// Slice
const featuredRoomsSlice = createSlice({
  name: 'featuredRooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedRooms.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.featuredRooms = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchFeaturedRooms.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export default featuredRoomsSlice.reducer
