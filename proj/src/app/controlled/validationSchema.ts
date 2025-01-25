import * as Yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with a capital letter.')
    .required('Name is required.'),

  age: Yup.number()
    .min(0, 'Age cannot be negative.')
    .required('Age is required.'),

  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),

  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, including: 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.',
    )
    .required('Password is required.'),

  confiumPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match.')
    .required('Confirm Password is required.'),

  gender: Yup.string()
    .oneOf(['Man', 'Woman'], 'Please select a gender.')
    .required('Gender is required.'),

  tc: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions.')
    .required('You must accept the terms and conditions.'),

  fileBase64: Yup.string()
    .nullable()
    .test(
      'fileFormat',
      'Only .png and .jpeg files are allowed.',
      (value) =>
        !value ||
        value.startsWith('data:image/png') ||
        value.startsWith('data:image/jpeg'),
    )
    .test('fileSize', 'File size must be less than 2MB.', (value) => {
      if (!value) return true;
      const base64StringLength = value.length - (value.indexOf(',') + 1);
      const sizeInBytes =
        (base64StringLength * 3) / 4 - (value.endsWith('=') ? 1 : 0);
      return sizeInBytes <= 2 * 1024 * 1024;
    })
    .required('Please upload an image.'),

  country: Yup.string().required('Please select a country.'),
});
