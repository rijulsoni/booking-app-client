import api from '@/lib/api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAvailableRooms = createAsyncThunk(
  'hotelSearch/fetchAvailableRooms',
  async (params, thunkAPI) => {
    try {
      const response = await api.get('hotels/search', {
        params
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const hotelSearchSlice = createSlice({
  name: 'hotelSearch',
  initialState: {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    results: [],
    loading: false,
    error: null
  },
  reducers: {
    setSearchField(state, action) {
      const { field, value } = action.payload
      state[field] = value
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableRooms.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAvailableRooms.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload.hotels
      })
      .addCase(fetchAvailableRooms.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { setSearchField } = hotelSearchSlice.actions
export default hotelSearchSlice.reducer
