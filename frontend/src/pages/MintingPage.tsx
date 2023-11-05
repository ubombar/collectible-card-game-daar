import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';

import CreateCollectionStep from '../components/CreateCollectionStep';
import SelectCardsStep from '../components/SelectCardsStep';
import SelectUserStep from '../components/SelectUserStep';

import ShowPath from '../components/ShowPath';
import { useWallet } from '@/utilities';
import * as Skry from "scryfall-sdk";

// const allCards = [
//   {
//     id: 1,
//     url: "aaa"
//   },
//   {
//     id: 2,
//     url: "bbb"
//   },
//   {
//     id: 3,
//     url: "ccc"
//   },
//   {
//     id: 4,
//     url: "ddd"
//   },
// ];

const allUsers = [
  { id: 1, name: 'User 1', otherInfo: '...' },
  { id: 2, name: 'User 2', otherInfo: '...' },
  { id: 3, name: 'User 3', otherInfo: '...' },
];

const steps = ['Create a new collection', 'Select cards to mint', 'Select the user to mint the cards for'];

export const MintingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const wallet = useWallet();
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [maxCardCount, setMaxCardCount] = useState(0);
  const [stepOneInputs, setStepOneInputs] = useState({ name: String, maxnum: Number });
  const [allCards, setAllCards] = useState([]);

  if (activeStep == 1 && allCards.length == 0) {
    console.log("23123123123123123123");

    Skry.Sets.all().then((setOfCards) => {
      console.log(setOfCards);

      var cardsNew = setOfCards.map((card) => {
        return {
          id: card.id,
          url: card.name
        }
      });
      setAllCards(cardsNew);
    })
  }

  const handleNext = () => {
    if (isStepComplete) {
      if (activeStep == 0) {
        wallet?.cardmanagerContract.createCollection(stepOneInputs.name, stepOneInputs.maxnum).then(() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setIsStepComplete(false);
        })
      } else if (activeStep == 1) {
        // Mint the selected cards
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsStepComplete(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CreateCollectionStep isComplete={setIsStepComplete} getMaxCardCount={setMaxCardCount} setStepOneInputs={setStepOneInputs} />;
      case 1:
        return <SelectCardsStep cards={allCards.slice(0, 10)} isComplete={setIsStepComplete} max={maxCardCount} />;
      case 2:
        return <SelectUserStep users={allUsers} isComplete={setIsStepComplete} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <ShowPath />
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