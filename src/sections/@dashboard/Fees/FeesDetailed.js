import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';

export default function FeesDetailed(props) {
  const comPDF = useRef();
  const id = props.userdet;
  const [val, setval] = useState([]);

  // useEffect(() => {
  //   axios.get(`https://academia-master-api.onrender.com/api/inquiry/${id}`).then((x) => {
  //     setval(x.data);
  //   });
  // }, []);
  const PrintPDF = useReactToPrint({
    content: () => comPDF.current,
    documentTitle: 'UserFees',
  });
  return (
    <div ref={comPDF} style={{ width: '100%' }}>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>title</td>
          </tr>
        </thead>
        <tbody>
          {
            <div>
              <h1>{val.name}</h1>
              <h2>{val.parentsname}</h2>
            </div>
          }
        </tbody>
      </table>
      <Button variant="contained" onClick={PrintPDF}>
        Print
      </Button>
    </div>
  );
}
