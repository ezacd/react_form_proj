import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confiumPassword: string;
  gender: 'Man' | 'Woman';
  tc: boolean;
  fileBase64: string;
  country: string;
}

interface FormState {
  controlledSubmittedData: FormData[];
  uncontrolledSubmittedData: FormData[];
}

const initialState: FormState = {
  controlledSubmittedData: [],
  uncontrolledSubmittedData: [],
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitControlledForm: (state, action: PayloadAction<FormData>) => {
      if (state.controlledSubmittedData.length > 0) {
        state.controlledSubmittedData[0] = action.payload;
      } else {
        state.controlledSubmittedData.push(action.payload);
      }
    },
    submitUncontrolledForm: (state, action: PayloadAction<FormData>) => {
      console.log(action.payload);
      if (state.uncontrolledSubmittedData.length > 0) {
        state.uncontrolledSubmittedData[0] = action.payload;
      } else {
        state.uncontrolledSubmittedData.push(action.payload);
      }
    },
  },
});

export const { submitControlledForm, submitUncontrolledForm } =
  formSlice.actions;

export default formSlice.reducer;
