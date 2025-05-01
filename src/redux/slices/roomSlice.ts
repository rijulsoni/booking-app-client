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

interface RoomState {
    room: Room | null
    loading: boolean
    error: string | null
}

const initialState: RoomState = {
    room: null,
    loading: false,
    error: null,
}

export const fetchRoom = createAsyncThunk<Room, { hotelId: string, roomId: string }, { rejectValue: string }>(
    'room/fetchRoom',
    async ({ hotelId, roomId }, { rejectWithValue }) => {
        try {
            const response = await api.get<Room>(`hotels/${hotelId}/rooms/${roomId}`)
            console.log(response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || 'Failed to fetch room'
            )
        }
    }
)

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        clearRoom: (state) => {
            state.room = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoom.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<Room>) => {
                state.room = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Something went wrong'
            })
    }
})

export const { clearRoom } = roomSlice.actions

export default roomSlice.reducer
