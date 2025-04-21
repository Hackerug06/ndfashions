import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Rating, Box } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

function ReviewPrompt({ onClose }) {
  const [rating, setRating] = React.useState(0);

  const handleSubmit = () => {
    // Here you would typically send the rating to your backend
    console.log('User rating:', rating);
    onClose();
    
    // Open app store based on platform
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
        <Box display="flex" justifyContent="center" mt={2}>
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
