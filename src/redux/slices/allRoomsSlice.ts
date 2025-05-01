import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '@/lib/api'

interface Room {
    _id: string
    room_number: number
    price: number
    availability: boolean
    description: string
    capacity: number
    adults: number
    children: number
    room_type: string
    discount: number
    features: RoomFeatures
    hotel_id: string
    name: string
}

interface RoomFeatures {
    air_conditioning: boolean
    attached_bathroom: boolean
    balcony: boolean
    double_bed: boolean
    geyser: boolean
    heating: boolean
    king_bed: boolean
    room_service: boolean
    tv: boolean
}

interface AllRoomsState {
    rooms: Room[] | null
    loading: boolean
    error: string | null
}

const initialState: AllRoomsState = {
    rooms: null,
    loading: false,
    error: null,
}

export const fetchAllRooms = createAsyncThunk<Room[], string, { rejectValue: string }>(
    'allRooms/fetchAllRooms',
    async (hotelId, { rejectWithValue }) => {
        try {
            const response = await api.get<Room[]>(`/hotels/${hotelId}/rooms`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || 'Failed to fetch rooms'
            )
        }
    }
)

const allRoomsSlice = createSlice({
    name: 'allRooms',
    initialState,
    reducers: {
        clearAllRooms: (state) => {
            state.rooms = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRooms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.rooms = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchAllRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Something went wrong'
            })
    }
})

export const { clearAllRooms } = allRoomsSlice.actions

export default allRoomsSlice.reducer
