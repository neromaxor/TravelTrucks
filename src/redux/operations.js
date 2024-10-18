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
        params: {
          page,
          limit,
        },
      });
      return response.data.items;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
