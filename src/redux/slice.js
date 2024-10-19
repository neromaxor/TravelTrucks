import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    favorite: [],
    filters: {
      AC: true,
      bathroom: true,
      kitchen: true,
      TV: true,
      radio: true,
      refrigerator: true,
      microwave: true,
      gas: true,
      water: true,
    },
    campers: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.campers = action.payload.items || [];
        state.total = action.payload.total;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
