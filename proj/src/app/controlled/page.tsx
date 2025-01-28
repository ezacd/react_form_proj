'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './controlled_page.css';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../_redux/formSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { useRouter } from 'next/navigation';
import { RootState } from '../_redux/store';

type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confiumPassword: string;
  gender: 'Man' | 'Woman';
  tc: boolean;
  fileBase64: string;
  country: string;
};

export default function Controlled() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const controlledData = useSelector(
    (state: RootState) => state.form.submittedData[0],
  );
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (controlledData) {
      reset(controlledData);
    }
  }, [controlledData, reset]);

  const onSubmit = (data: FormData) => {
    dispatch(submitForm(data));
    router.push('/');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only .png and .jpeg files are allowed.');
        return;
      }

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
            <p className="error">{errors.name?.message}</p>
          </label>
          <label>
            Age
            <input
              type="number"
              {...register('age', { required: true, min: 0 })}
            />
            <p className="error">{errors.age?.message}</p>
          </label>
          <label>
            Email
            <input type="email" {...register('email', { required: true })} />
            <p className="error">{errors.email?.message}</p>
          </label>
          <label>
            Password
            <input
              type="password"
              {...register('password', { required: true })}
            />
            <p className="error">{errors.password?.message}</p>
          </label>
          <label>
            Confirm password
            <input
              type="password"
              {...register('confiumPassword', { required: true })}
            />
            <p className="error">{errors.confiumPassword?.message}</p>
          </label>
          <label>
            Gender
            <select {...register('gender', { required: true })}>
              <option value="">Select gender</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
            </select>
            <p className="error">{errors.gender?.message}</p>
          </label>
          <label className="TC">
            T&C
            <input type="checkbox" {...register('tc', { required: true })} />
            <p className="error">{errors.tc?.message}</p>
          </label>
          <label>
            Select image
            <input type="file" onChange={handleFileChange} />
            {fileError && <p className="error">{fileError}</p>}
          </label>
          <label>
            Country
            <input type="text" {...register('country', { required: true })} />
            <p className="error">{errors.country?.message}</p>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
