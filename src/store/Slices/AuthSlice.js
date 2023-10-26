import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  otp: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setOTP: (state, action) => {
      state.otp = action.payload.otp;
    },
    resetOTP: (state) => {
      state.otp = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
