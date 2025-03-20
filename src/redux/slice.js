import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchFilters } from "./operations";
import { selectFiltersCampers } from "./selector";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    favorite: [],
    filters: {
      location: "",
      selectedFilters: [],
      isFiltered: false, // Додаємо прапорець, чи застосовані фільтри
    },
    campers: [],
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    setFilters(state, action) {
      const { key, value } = action.payload;
      if (key === "location") {
        state.filters.location = value;
      }
    },
    toggleFilter(state, action) {
      const filter = action.payload;
      const index = state.filters.selectedFilters.indexOf(filter);
      if (index === -1) {
        state.filters.selectedFilters.push(filter);
      } else {
        state.filters.selectedFilters.splice(index, 1);
      }
    },
    clearFilters(state) {
      state.filters.selectedFilters = [];
      state.filters.location = "";
      state.filters.isFiltered = false;
    },
    setIsFiltered(state, action) {
      state.filters.isFiltered = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        const newCampers = action.payload.filter(
          (newCamper) => !state.campers.some((camper) => camper.id === newCamper.id)
        );
        state.campers = [...state.campers, ...newCampers];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.campers = Array.isArray(action.payload) ? action.payload : [];
        state.filters.isFiltered = true; // Встановлюємо прапорець, що фільтри застосовані
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
export const { setFilters, toggleFilter, clearFilters, setIsFiltered } = campersSlice.actions;