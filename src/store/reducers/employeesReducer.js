import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees = [...state.employees, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
