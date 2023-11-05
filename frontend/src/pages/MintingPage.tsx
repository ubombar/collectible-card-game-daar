import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';

import CreateCollectionStep from '../components/CreateCollectionStep';
import SelectCardsStep from '../components/SelectCardsStep';
import SelectUserStep from '../components/SelectUserStep';

import ShowPath from '../components/ShowPath';
import MyAppBar from '../components/MyAppBar'

const allCards = [
    {
        id: 1,
        url: "aaa"
      },
      {
        id: 2,
        url: "bbb"
      },
      {
        id: 3,
        url: "ccc"
      },
      {
        id: 4,
        url: "ddd"
      },
  ];
  
  const allUsers = [
    { id: 1, name: 'User 1', otherInfo: '...'},
  { id: 2, name: 'User 2', otherInfo: '...'},
  { id: 3, name: 'User 3', otherInfo: '...'},
  ];

const steps = ['Create a new collection', 'Select cards to mint', 'Select the user to mint the cards for'];

export const MintingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [maxCardCount, setMaxCardCount]= useState(0);

  const handleNext = () => {
    if (isStepComplete) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsStepComplete(false);
        }
    };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CreateCollectionStep isComplete={setIsStepComplete} getMaxCardCount={setMaxCardCount}/>;
      case 1:
        return <SelectCardsStep cards={allCards} isComplete={setIsStepComplete} max={maxCardCount}/>;
      case 2:
        return <SelectUserStep  users={allUsers} isComplete={setIsStepComplete} />;
      default:
        return 'Unknown step';
    }
  };
  
  return (
    <Container>
      <ShowPath/>
      <MyAppBar/>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{ textAlign: 'center' }}>
            <Typography>All steps completed</Typography>
          </div>
        ) : (
          <div>
            <Typography component={'span'}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNext}
                disabled={!isStepComplete}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
//ATTENZIONE devo far sì che le scelte e i campi inseriti si mantengano tornando indietro?