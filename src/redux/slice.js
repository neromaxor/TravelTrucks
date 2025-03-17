import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchFilters } from "./operations";
import { selectFiltersCampers } from "./selector";


const campersSlice = createSlice({
  name: "campers",
  initialState: {
    favorite: [],
    filters: {
      location: "",
      AC: false,
      bathroom: false,
      kitchen: false,
      TV: false,
      radio: false,
      microwave: false,
      Automatic: "",
      water: false,
      type: "", 
    },
    campers: [],
    loading: false,
    error: null,
    page: 1, // Додаємо початковий номер сторінки
  },
  reducers: {selectFilters (state, action) {
    state.filters[action.payload.key] = action.payload.value;
  }},
  // },Буде оновлювати стан
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.campers = [...state.campers, ...action.payload];
      })

      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
    .addCase( fetchFilters.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchFilters.fulfilled, (state, action) => {
      state.loading = false;
      state.campers = action.payload;
    })
    .addCase(fetchFilters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default campersSlice.reducer;
export const { selectFilters} = campersSlice.actions;