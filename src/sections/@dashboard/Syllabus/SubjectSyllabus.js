import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import { Button, Card, Container, Grid, CardActionArea, Typography, Box } from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';

export default function SubjectSyllabus() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            {/* <Link
          href="https://drive.google.com/drive/folders/1WfgKy03b9CU1jC72Fd4cSahc1p9oAPZW?usp=sharing"
          underline="none"
        > */}
            <Card sx={{ maxWidth: 530 }} onClick={handleClickOpen}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image="https://static.vecteezy.com/system/resources/thumbnails/003/323/638/small/flat-teachers-day-background-free-vector.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* </Link> */}
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        // fullScreen
        fullWidth
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="pt-4 pb-4 sub-image">
          {'Subject name'}
        </DialogTitle>
        <DialogContent>
          Google link
          {/* ============================================================================= */}
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Notice Board</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Assignment</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
