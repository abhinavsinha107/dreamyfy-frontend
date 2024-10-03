import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.accessToken = action.payload.token;
    },
    resetToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setToken, resetToken } = authSlice.actions;

export default authSlice.reducer;
