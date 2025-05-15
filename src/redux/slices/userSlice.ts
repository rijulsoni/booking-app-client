import api from '@/lib/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface User {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  bio: string;
  profile_image: string;
  agreeToTerms?: boolean;
}

interface UserState {
  userInfo: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
};


export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/login', { user: credentials });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to login'
      );
    }
  }
);

export const signupUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string; password_confirmation?: string },
  { rejectValue: string }
>(
  'user/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/users', { user: userData });
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error.response);
      if (error.response?.status === 409) {
        return rejectWithValue(
          error.response?.data?.error || 'User with this email already exists'
        );
      }
      return rejectWithValue(
        error.response?.data?.error || 'Failed to sign up'
      );
    }
  }
);

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<User>('/profile');
      return response.data;
    } catch (error: any) {
      console.error('Fetch user error:', error.response);
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch user'
      );
    }
  }
);

export const editUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>(
  'user/editUserProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await api.put<User>(`/users/${updatedData.id}`, { user: updatedData });
      return response.data;
    } catch (error: any) {
      console.error('Edit profile error:', error.response);
      return rejectWithValue(
        error.response?.data?.error || 'Failed to update profile'
      );
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.patch<User>('/users/update_avatar', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      console.error('Update profile image error:', error.response);
      return rejectWithValue(
        error.response?.data?.error || 'Failed to update profile image'
      );
    }
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      state.userInfo = null;
      state.error = null;
      state.status = 'idle';
      localStorage.removeItem('user');
    },
    resetError(state) {
      state.error = null;
    },

  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.userInfo = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;

      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      // Fetch user cases
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;

      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user';
      })
      .addCase(editUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.userInfo = action.payload.user;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update profile';
      })
  },
});


export const { logoutUser, resetError } = userSlice.actions;
export default userSlice.reducer;

