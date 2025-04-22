import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { FlashlightOn, FlashlightOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  flashlightToggle: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    zIndex: 10,
  }
});

function FlashlightToggle({ torchOn, toggleFlashlight }) {
  const classes = useStyles();
  return (
    <div className={classes.flashlightToggle}>
      <Tooltip title={torchOn ? "Turn off flashlight" : "Turn on flashlight"}>
        <IconButton onClick={toggleFlashlight} color="primary">
          {torchOn ? <FlashlightOn /> : <FlashlightOff />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default FlashlightToggle;
