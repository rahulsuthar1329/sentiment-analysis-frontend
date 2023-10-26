import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  loading: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});
