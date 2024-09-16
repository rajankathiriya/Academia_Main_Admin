import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import './Profile.css';

export default function StudentDetailed(props) {
  const comPDF = useRef();
  const PrintPDF = useReactToPrint({
    content: () => comPDF.current,
    documentTitle: 'UserFees',
  });
  const [rows, setRows] = useState([]);

  const id = props.userdet;

  useEffect(() => {
    axios.get(`https://academia-master-api.onrender.com/api/students/${id}`).then((x) => {
      setRows(x.data);
    });
  }, []);

  const timestamp = rows.inquirydate;
  const dateObject = new Date(timestamp);

  const year = dateObject.getFullYear();
  const month = `0${dateObject.getMonth() + 1}`.slice(-2); // Adding 1 as month is 0-based
  const day = `0${dateObject.getDate()}`.slice(-2);

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <>
      <Button variant="contained" onClick={PrintPDF}>
        Print
      </Button>
      <div className="container-fluid mt-5 pt-5" ref={comPDF}>
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    {rows.gender === 'Male' ? (
                      <img
                        src="/assets/images/avatars/avatar_12.jpg"
                        alt="Male Avatar"
                        className="rounded-circle"
                        width="150"
                      />
                    ) : rows.gender === 'Female' ? (
                      <img
                        src="/assets/images/avatars/avatar_1.jpg"
                        alt="Female Avatar"
                        className="rounded-circle"
                        width="150"
                      />
                    ) : (
                      <img
                        src="/assets/images/avatars/avatar_11.jpg"
                        alt="Other Avatar"
                        className="rounded-circle"
                        width="150"
                      />
                    )}

                    <div className="mt-3">
                      <h4>
                        {rows.name} -
                        <span>
                          <small style={{ fontSize: '17px' }}>({rows.gender})</small>
                        </span>
                      </h4>
                      <p className="text-secondary mb-1">{rows.studentmobile}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h6 className="d-flex align-items-center mb-3">
                    <i className="material-icons text-info mr-2" />
                    Attendance Status
                  </h6>
                  <small>75%</small>
                  <div className="progress mb-3 mt-2" style={{ height: '5px' }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-3">
                <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
                  Student Details
                </h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {rows.name} {rows.parentsname}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Student No</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.studentmobile}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Parent No</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.parentmobile}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Whatsapp No</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.whatsapp}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {rows.address} - {rows.city}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
                  Admission Details
                </h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Education</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.education}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">selected course</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.course}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Fees</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{rows.fees}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Admission date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{formattedDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
