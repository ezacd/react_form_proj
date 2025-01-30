'use client';

import { useRef, useState } from 'react';
import './uncontrolled_page.css';
import { validationSchema } from '../controlled/validationSchema';
import * as Yup from 'yup';

export default function Unontrolled() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const dataObject = Object.fromEntries(formData.entries());

    const formattedData = {
      ...dataObject,
      age: Number(dataObject.age),
      tc: formData.get('tc') === 'on',
      fileBase64,
    };
    try {
      await validationSchema.validate(formattedData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only .png and .jpeg files are allowed.');
        setFileBase64('');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
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
        <div>Uncontrolled form</div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>
          <label>
            Age
            <input type="number" name="age" />
            {errors.age && <p className="error">{errors.age}</p>}
          </label>
          <label>
            Email
            <input type="email" name="email" />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            Password
            <input type="password" name="password" />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <label>
            Confirm password
            <input type="password" name="confiumPassword" />
            {errors.confiumPassword && (
              <p className="error">{errors.confiumPassword}</p>
            )}
          </label>
          <label>
            Gender
            <select name="gender">
              <option value="">Select gender</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </label>
          <label className="TC">
            T&C
            <input type="checkbox" name="tc" />
            {errors.tc && <p className="error">{errors.tc}</p>}
          </label>
          <label>
            Select image
            <input type="file" name="file" onChange={handleFileChange} />
            {fileError && <p className="error">{fileError}</p>}
            {errors.fileBase64 && <p className="error">{errors.fileBase64}</p>}
          </label>
          <label>
            Country
            <input type="text" name="country" />
            {errors.country && <p className="error">{errors.country}</p>}
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
