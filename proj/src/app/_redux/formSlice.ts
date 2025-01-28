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
  submittedData: FormData[];
}

const initialState: FormState = {
  submittedData: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<FormData>) => {
      if (state.submittedData.length > 0) {
        state.submittedData[0] = action.payload;
      } else {
        state.submittedData.push(action.payload);
      }
    },
  },
});

export const { submitForm } = formSlice.actions;

export default formSlice.reducer;
