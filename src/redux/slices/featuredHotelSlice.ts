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
}

interface FeaturedHotelsState {
  featuredHotels: Hotel[]
  loading: boolean
  error: string | null
}

const initialState: FeaturedHotelsState = {
  featuredHotels: [],
  loading: false,
  error: null,
}

export const fetchFeaturedHotels = createAsyncThunk<Hotel[], void, { rejectValue: string }>(
  'hotel/fetchFeaturedHotels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Hotel[]>('/hotels/featured_hotel')
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch featured hotels'
      )
    }
  }
)

const featuredHotelsSlice = createSlice({
  name: 'featuredHotels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedHotels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedHotels.fulfilled, (state, action: PayloadAction<Hotel[]>) => {
        state.featuredHotels = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchFeaturedHotels.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export default featuredHotelsSlice.reducer
