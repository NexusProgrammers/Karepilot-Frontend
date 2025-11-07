import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/exports';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuthenticated, clearAuth, setLoading } = authSlice.actions;

export default authSlice.reducer;
