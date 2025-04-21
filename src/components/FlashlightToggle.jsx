import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { FlashlightOn, FlashlightOff } from '@material-ui/icons';

function FlashlightToggle({ torchOn, toggleFlashlight }) {
  return (
    <div className="flashlight-toggle">
      <Tooltip title={torchOn ? "Turn off flashlight" : "Turn on flashlight"}>
        <IconButton onClick={toggleFlashlight} color="primary">
          {torchOn ? <FlashlightOn /> : <FlashlightOff />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default FlashlightToggle;
