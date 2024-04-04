import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      name: "",
      price: "",
      description: "",
      published: false,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    updateFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
