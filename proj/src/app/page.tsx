'use client';

import Link from 'next/link';
import './main_page.css';
import { useSelector } from 'react-redux';
import { RootState } from './_redux/store';
import Image from 'next/image';

export default function Home() {
  const controlledData = useSelector(
    (state: RootState) => state.form.controlledSubmittedData[0],
  );

  const uncontrolledData = useSelector(
    (state: RootState) => state.form.uncontrolledSubmittedData[0],
  );

  return (
    <div className="main_page_container">
      <div className="main_page_buttons_box">
        {/* Controlled Form Section */}
        <div className="form_section">
          <div className="main_page_link_button">
            <Link className="button" href="/controlled">
              Controlled Form
            </Link>
          </div>
          <div className="submitted_data_box">
            <h2>Controlled Form Data</h2>
            {controlledData ? (
              <div className="submitted_data">
                <p>
                  <strong>Name:</strong> {controlledData.name}
                </p>
                <p>
                  <strong>Age:</strong> {controlledData.age}
                </p>
                <p>
                  <strong>Email:</strong> {controlledData.email}
                </p>
                <p>
                  <strong>Password:</strong> {controlledData.password}
                </p>
                <p>
                  <strong>Confirm Password:</strong>{' '}
                  {controlledData.confiumPassword}
                </p>
                <p>
                  <strong>Gender:</strong> {controlledData.gender}
                </p>
                <p>
                  <strong>Country:</strong> {controlledData.country}
                </p>
                <p>
                  <strong>Accepted T&C:</strong>{' '}
                  {controlledData.tc ? 'Yes' : 'No'}
                </p>
                {controlledData.fileBase64 && (
                  <div className="main_page_img_box">
                    <strong>Uploaded Image:</strong>
                    <Image
                      src={controlledData.fileBase64}
                      alt="Uploaded"
                      className="img"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>No data submitted yet.</p>
            )}
          </div>
        </div>

        {/* Uncontrolled Form Section */}
        <div className="form_section">
          <div className="main_page_link_button">
            <Link className="button" href="/uncontrolled">
              Uncontrolled Form
            </Link>
          </div>
          <div className="submitted_data_box">
            <h2>Uncontrolled Form Data</h2>
            {uncontrolledData ? (
              <div className="submitted_data">
                <p>
                  <strong>Name:</strong> {uncontrolledData.name}
                </p>
                <p>
                  <strong>Age:</strong> {uncontrolledData.age}
                </p>
                <p>
                  <strong>Email:</strong> {uncontrolledData.email}
                </p>
                <p>
                  <strong>Password:</strong> {uncontrolledData.password}
                </p>
                <p>
                  <strong>Confirm Password:</strong>{' '}
                  {uncontrolledData.confiumPassword}
                </p>
                <p>
                  <strong>Gender:</strong> {uncontrolledData.gender}
                </p>
                <p>
                  <strong>Country:</strong> {uncontrolledData.country}
                </p>
                <p>
                  <strong>Accepted T&C:</strong>{' '}
                  {uncontrolledData.tc ? 'Yes' : 'No'}
                </p>
                {uncontrolledData.fileBase64 && (
                  <div className="main_page_img_box">
                    <strong>Uploaded Image:</strong>
                    <Image
                      src={uncontrolledData.fileBase64}
                      alt="Uploaded"
                      className="img"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>No data submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
