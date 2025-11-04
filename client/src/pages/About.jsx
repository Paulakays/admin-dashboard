// import { Box, Typography, Paper, Grid } from "@mui/material";
import { Box, Typography, Paper, Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import "../styles/App.css";

function About() {
  return (
    <Box className="about-wrapper">
      <Typography variant="h4" className="about-title" gutterBottom>
        About This Dashboard
      </Typography>
      <Typography variant="body1" className="about-description" gutterBottom>
        Welcome to the Admin Dashboard! This application is built with <strong>React</strong> for the frontend and <strong>Node.js</strong> for the backend.
        Manage users, view statistics, and control the system all in one place. Version 1.0.0
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper className="about-card" elevation={3}>
            <InfoIcon className="about-icon" />
            <Typography variant="h6" className="about-card-title">
              User Management
            </Typography>
            <Typography variant="body2">
              Add, edit, and remove users easily. Search, filter, and paginate the user list efficiently.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="about-card" elevation={3}>
            <DashboardIcon className="about-icon" />
            <Typography variant="h6" className="about-card-title">
              Dashboard Insights
            </Typography>
            <Typography variant="body2">
              Get quick insights and overviews of system activity, user roles, and usage metrics.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="about-card" elevation={3}>
            <BuildIcon className="about-icon" />
            <Typography variant="h6" className="about-card-title">
              Customizable
            </Typography>
            <Typography variant="body2">
              Easily extend the dashboard to include new features, modules, and integrations for your business.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
