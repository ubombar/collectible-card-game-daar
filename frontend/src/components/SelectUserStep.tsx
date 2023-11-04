import React, { useState } from 'react';
import { List, ListItem, Checkbox, TextField } from '@mui/material';

const SelectCardsStep = ({ users, isComplete }) => {
  const [userAddress, setUserAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
    checkCompletion(event.target.value);
  };

  const checkCompletion = (address) => {
    isComplete(address);
    /*if (address) {
      isComplete(true);
    } else {
     isComplete(false);
    }*/
  };

  

  return (
    <div>
      <h2>Select user to mint cards for</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <TextField
        label="User address"
        variant="outlined"
        value={userAddress}
        onChange={handleAddressChange}
        fullWidth
      />
      </div>
  );
};

export default SelectCardsStep;
