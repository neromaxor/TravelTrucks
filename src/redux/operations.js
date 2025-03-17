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
      return response.data.items;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "campers/fetchFilteredCampers",
  async (filters, thunkApi) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await api.get(`/campers?${params}`);
      console.log(response.data.items);
      if (response.status === 404) {
        return thunkApi.rejectWithValue("No campers found for this search.");
      }
      return response.data.items;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);



