'use client';

import { useForm } from 'react-hook-form';
import './controlled_page.css';
import { useDispatch } from 'react-redux';
import { submitForm } from '../_redux/formSlice';
import { useState } from 'react';

type FormData = {
  name: string;
  age: string;
  email: string;
  password: string;
  confiumPassword: string;
  gender: string;
  tc: boolean;
  fileBase64: string | null;
  country: string;
};

export default function Controlled() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const dispatch = useDispatch();
  const [fileError, setFileError] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    dispatch(submitForm(data));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only .png and .jpeg files are allowed.');
        setValue('fileBase64', null); // set null if file is invalid
        return;
      }

      // convert file to Base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setValue('fileBase64', base64);
        setFileError(null);
      };
      reader.onerror = () => {
        setFileError('Error reading file.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form_page">
      <div className="form">
        <div>Controlled form</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input type="text" {...register('name', { required: true })} />
          </label>
          <label>
            Age
            <input
              type="number"
              {...register('age', { required: true, min: 0 })}
            />
          </label>
          <label>
            Email
            <input type="email" {...register('email', { required: true })} />
          </label>
          <label>
            Password
            <input
              type="password"
              {...register('password', { required: true })}
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              {...register('confiumPassword', { required: true })}
            />
          </label>
          <label>
            Gender
            <select {...register('gender', { required: true })}>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </label>
          <label className="TC">
            T&C
            <input type="checkbox" {...register('tc', { required: true })} />
          </label>
          <label>
            Select image
            <input type="file" onChange={handleFileChange} />
            {fileError && <p className="error">{fileError}</p>}
          </label>
          <label>
            Country
            <input type="text" {...register('country', { required: true })} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
