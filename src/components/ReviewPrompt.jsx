import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function ReviewPrompt({ onClose }) {
  const [rating, setRating] = React.useState(0);

  const handleSubmit = () => {
    console.log('User rating:', rating);
    onClose();
    
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open('itms-apps://itunes.apple.com/app/idYOUR_APP_ID?action=write-review');
    } else {
      window.open('market://details?id=YOUR_PACKAGE_NAME');
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enjoying our QR Scanner?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We'd love to hear your feedback! Please rate your experience.
        </DialogContentText>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Rating
            name="app-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            size="large"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Maybe Later</Button>
        <Button onClick={handleSubmit} color="primary" disabled={rating === 0}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewPrompt;
