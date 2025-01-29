'use client';

import { useRef, useState } from 'react';
import './uncontrolled_page.css';

export default function Unontrolled() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: Record<string, string> = {};
    const formData = new FormData(formRef.current!);

    for (const [key, value] of formData.entries()) {
      data[key] = value as string;
    }
    data.file = fileBase64;
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
        <div>Controlled form</div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" />
            {/* <p className="error">{errors.name?.message}</p> */}
          </label>
          <label>
            Age
            <input type="number" name="age" />
            {/* <p className="error">{errors.age?.message}</p> */}
          </label>
          <label>
            Email
            <input type="email" name="email" />
            {/* <p className="error">{errors.email?.message}</p> */}
          </label>
          <label>
            Password
            <input type="password" name="password" />
            {/* <p className="error">{errors.password?.message}</p> */}
          </label>
          <label>
            Confirm password
            <input type="password" name="confiun_password" />
            {/* <p className="error">{errors.confiumPassword?.message}</p> */}
          </label>
          <label>
            Gender
            <select name="gender">
              <option value="">Select gender</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
            </select>
            {/* <p className="error">{errors.gender?.message}</p> */}
          </label>
          <label className="TC">
            T&C
            <input type="checkbox" name="tc" />
            {/* <p className="error">{errors.tc?.message}</p> */}
          </label>
          <label>
            Select image
            <input type="file" name="file" onChange={handleFileChange} />
            {fileError && <p className="error">{fileError}</p>}
          </label>
          <label>
            Country
            <input type="text" name="country" />
            {/* <p className="error">{errors.country?.message}</p> */}
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
