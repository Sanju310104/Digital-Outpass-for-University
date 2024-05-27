import React from 'react';
import { Container, CssBaseline, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function StudentPage() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div style={styles.paper}>
        <Typography component="h1" variant="h5" style={styles.welcomeText}>
          Welcome, Student!
        </Typography>
        <Typography component="p" style={styles.infoText}>
          This is the student dashboard where you can find all the resources and information you need.
        </Typography>
        <Grid container spacing={4}>
          {/* Card for applying outpass */}
          <Grid item xs={12} sm={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Apply for Outpass
                </Typography>
                <Typography style={styles.cardText}>
                  Apply for an outpass to leave the campus. Number of Outpass Requests Remaining: 3
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  <Link to="/apply-outpass" style={styles.link}>Apply Now</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* Card for checking outpass status */}
          <Grid item xs={12} sm={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Check Outpass Status
                </Typography>
                <Typography style={styles.cardText}>
                  Check the status of your submitted outpass request.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  <Link to="/check-outpass-status" style={styles.link}>Check Status</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* Card for notifications and history */}
          <Grid item xs={12}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Notifications and History
                </Typography>
                <Typography style={styles.cardText}>
                  Number of Outpass Requests Remaining: 3
                </Typography>
                <Typography variant="subtitle1" style={styles.subTitle}>
                  Notifications
                </Typography>
                <Typography>
                  Your outpass request to the library is pending approval.
                </Typography>
                <Typography>
                  Your outpass request to home has been approved.
                </Typography>
                <Typography variant="subtitle1" style={styles.subTitle}>
                  Outpass History
                </Typography>
                <Typography>
                  Destination: Mall | Date: 2024-05-20 | Reason: Shopping
                </Typography>
                <Typography>
                  Destination: Park | Date: 2024-05-15 | Reason: Exercise
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" style={styles.button}>
          <Link to="/" style={styles.link}>Go to Home</Link>
        </Button>
      </div>
    </Container>
  );
}

const styles = {
  paper: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  welcomeText: {
    marginBottom: 16,
  },
  infoText: {
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    height: '100%',
  },
  cardText: {
    marginTop: 12,
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    width: '100%',
    display: 'block',
    textAlign: 'center',
  },
};

export default StudentPage;
