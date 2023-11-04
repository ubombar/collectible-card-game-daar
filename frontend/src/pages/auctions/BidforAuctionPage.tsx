// import { useWallet } from '@/utilities';
// import styles from '../../styles.module.css'
// import { Button, Grid, ListItem } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import AuctionView from '@/components/AuctionView';
// import { Stepper, Step, StepLabel, Typography, Container } from '@mui/material';

// const allCards = [
//     {
//         id: 1,
//         url: "aaa"
//       },
//       {
//         id: 2,
//         url: "bbb"
//       },
//       {
//         id: 3,
//         url: "ccc"
//       },
//       {
//         id: 4,
//         url: "ddd"
//       },
//   ];


// const steps = ['Select the card to trade', 'Approve the NFT transfer', 'Wait for people to offer their cards'];

// export const BidforAuctionPage = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [isStepComplete, setIsStepComplete] = useState(false);
//   const [maxCardCount, setMaxCardCount]= useState(0);

//   const handleNext = () => {
//     if (isStepComplete) {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setIsStepComplete(false);
//         }
//     };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
  
//   const getStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return <CreateCollectionStep isComplete={setIsStepComplete} getMaxCardCount={setMaxCardCount}/>;
//       case 1:
//         return <SelectCardsStep cards={allCards} isComplete={setIsStepComplete} max={maxCardCount}/>;
//       case 2:
//         return <SelectUserStep  users={allUsers} isComplete={setIsStepComplete} />;
//       default:
//         return 'Unknown step';
//     }
//   };
  
//   return (
//     <Container>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div style={{ textAlign: 'center' }}>
//             <Typography>All steps completed</Typography>
//           </div>
//         ) : (
//           <div>
//             <Typography>{getStepContent(activeStep)}</Typography>
//             <div>
//               <Button disabled={activeStep === 0} onClick={handleBack}>
//                 Back
//               </Button>
//               <Button 
//                 variant="contained" 
//                 color="primary" 
//                 onClick={handleNext}
//                 disabled={!isStepComplete}>
//                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };
// //ATTENZIONE devo far sì che le scelte e i campi inseriti si mantengano tornando indietro?

export const BidforAuctionPage = () => {
  return (
    <p>Test</p>
  );
}