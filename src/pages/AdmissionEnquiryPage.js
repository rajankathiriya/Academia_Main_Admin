import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';
import { Card, Container, Stack, Typography } from '@mui/material';
import AdmissionEnquiry from '../sections/@dashboard/AdmissionEnquiry/AdmissionEnquiry';

export default function ApplicantProfile() {
  const comPDF = useRef();
  const PrintPDF = useReactToPrint({
    content: () => comPDF.current,
    documentTitle: 'UserFees',
  });

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admission Enquiry
          </Typography>
          {/* <Button variant="contained" onClick={PrintPDF}>
            Print
          </Button> */}
        </Stack>

        <Card
          ref={comPDF}
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <AdmissionEnquiry />
        </Card>
      </Container>
    </>
  );
}
