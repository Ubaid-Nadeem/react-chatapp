import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  initialState: false,
  name: "loader",
  reducers: {
    setLoader: (state,action) => (state = action.payload),
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
