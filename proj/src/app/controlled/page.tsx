'use client';

import { useForm } from 'react-hook-form';
import './controlled_page.css';

type FormData = {
  name: string;
  age: string;
  email: string;
  password: string;
  confiumPassword: string;
  gender: string;
  tc: boolean;
  file: FileList;
  country: string;
};

export default function Controlled() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

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
            <input type="file" {...register('file', { required: true })} />
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
