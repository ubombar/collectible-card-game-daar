import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const CreateCollectionStep = ({ isComplete, getMaxCardCount, setStepOneInputs }) => {
  const [collectionName, setCollectionName] = useState('');
  const [maxCardCount, setMaxCardCount] = useState('');

  const handleNameChange = (event) => {
    setCollectionName(event.target.value);
    checkCompletion(event.target.value, maxCardCount);

    setStepOneInputs((old) => {
      return {...old, name: event.target.value}
    })
  };

  const handleMaxCardCountChange = (event) => {
    setMaxCardCount(event.target.value);
    checkCompletion(collectionName, event.target.value);

    setStepOneInputs((old) => {
      return {...old, maxnum: event.target.value}
    })
  };

  const checkCompletion = (name, maxCount) => {
    if (name && maxCount) {
      getMaxCardCount(maxCount);
      isComplete(true);
    } else {
     isComplete(false);
    }

  };

  return (
    <div>
      <h2>Create a new collection</h2>
      <TextField
        label="Collection Name"
        variant="outlined"
        value={collectionName}
        onChange={handleNameChange}
        fullWidth
      />
      <TextField
        label="Max Card Count"
        variant="outlined"
        value={maxCardCount}
        onChange={handleMaxCardCountChange}
        fullWidth
      />
    </div>
  );
};

export default CreateCollectionStep;
