import { Button, TextField, Typography, Box } from "@mui/material";
import "../styles/App.css";

function Contact() {
  return (
    <Box className="contact-wrapper">
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>

      <Box component="form" sx={{ mt: 2, maxWidth: 800, margin: "0 auto" }}>
        <TextField label="Your Name" fullWidth margin="normal" />
        <TextField label="Your Email" fullWidth margin="normal" />
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#6610f4",
            "&:hover": { backgroundColor: "#520dc2" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Contact;
