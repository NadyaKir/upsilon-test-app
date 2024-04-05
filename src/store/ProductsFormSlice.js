import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formDataList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addFormData(state, action) {
      state.formDataList = [...state.formDataList, action.payload];
    },
    updateFormData(state, action) {
      const updatedList = state.formDataList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      state.formDataList = updatedList;
    },
    deleteFormData(state, action) {
      state.formDataList = state.formDataList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addFormData, updateFormData, deleteFormData } =
  formSlice.actions;
export default formSlice.reducer;
