import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confiumPassword: string;
  gender: string;
  tc: boolean;
  fileBase64: string | null;
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
      state.submittedData.push(action.payload);
    },
  },
});

export const { submitForm } = formSlice.actions;

export default formSlice.reducer;
