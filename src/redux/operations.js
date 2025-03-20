import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4 }, thunkApi) => {
    try {
      const response = await api.get("/campers", {
        params: { page, limit },
      });
      console.log(response.data);
      return response.data.items || response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "campers/fetchFilteredCampers",
  async ({ location, selectedFilters }, thunkApi) => {
    try {
      // Завантажуємо всі кемпери (без пагінації)
      const response = await api.get("/campers");
      const campers = response.data.items || response.data;

      const filteredCampers = campers.filter((camper) => {
        // Фільтрація за location (частковий збіг із нормалізацією)
        const locationMatch =
          !location ||
          camper.location
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(location.toLowerCase().replace(/\s+/g, ""));

        // Фільтрація за form і equipment
        let formMatch = true;
        let equipmentMatch = true;

        // Розділяємо фільтри на form і equipment
        const formFilters = selectedFilters.filter((filter) =>
          ["van", "fullyintegrated", "alcove"].includes(filter.toLowerCase())
        );
        const equipmentFilters = selectedFilters.filter((filter) =>
          ["ac", "automatic", "kitchen", "tv", "bathroom"].includes(filter.toLowerCase())
        );

        // Фільтрація за form: кемпер має відповідати хоча б одному значенню form
        if (formFilters.length > 0) {
          formMatch = formFilters.some((filter) => camper.form === filter.toLowerCase());
        }

        // Фільтрація за equipment: кемпер має відповідати всім обраним властивостям
        equipmentFilters.forEach((filter) => {
          const normalizedFilter = filter.toLowerCase();
          if (normalizedFilter === "automatic") {
            if (camper.transmission !== "automatic") {
              equipmentMatch = false;
            }
          }
          if (normalizedFilter === "ac" && !camper.AC) {
            equipmentMatch = false;
          }
          if (normalizedFilter === "kitchen" && !camper.kitchen) {
            equipmentMatch = false;
          }
          if (normalizedFilter === "bathroom" && !camper.bathroom) {
            equipmentMatch = false;
          }
          if (normalizedFilter === "tv" && !camper.TV) {
            equipmentMatch = false;
          }
        });

        return locationMatch && formMatch && equipmentMatch;
      });

      return filteredCampers;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);