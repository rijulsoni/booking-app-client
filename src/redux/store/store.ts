import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import featuredHotelsReducer from "../slices/featuredHotelSlice";
import hotelReducer from "../slices/hotelsSlice";
import roomReducer from "../slices/roomSlice";
import allRoomsReducer from "../slices/allRoomsSlice";
import featuredRoomsReducer from "../slices/featuredRoomSlice";
import hotelSearchReducer from "../slices/searchHotelSlice";
import allHotelsReducer from "../slices/allHotelSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    featuredHotels: featuredHotelsReducer,
    hotel: hotelReducer, 
    allRooms: allRoomsReducer,
    room: roomReducer,
    featuredRooms: featuredRoomsReducer,
    hotelSearch: hotelSearchReducer,
    allHotels: allHotelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
