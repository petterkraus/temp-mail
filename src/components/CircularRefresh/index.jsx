import React, { useState } from 'react';

const CircularProgressBar = (props) => {
  const { count } = props;
  const progress = 100 - ((count / 15) * 100);
  const barStyle = {
    backgroundColor: 'blue',
    height: '4px',
    borderRadius: '50%',
    position: 'absolute',
    top: 'calc(50% - 2px)',
    left: 'calc(50% - 100%)',
    transform: `scale(0.25) rotate(${360 * (progress / 100)}deg)`,
    transformOrigin: 'left center',
    clip: `rect(0px, 64px, 64px, 0px)`,
    width: `${progress}%`,
  };
  const numberStyle = {
    fontSize: '14px',
    position: 'relative',
    top: 'calc(50% - 7px)',
    left: 'calc(50% - 7px)',
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px', width: '64px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '50%', height: '64px', width: '64px', position: 'relative' }}>
        <div style={barStyle} />
        <p style={numberStyle}>{count}</p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
