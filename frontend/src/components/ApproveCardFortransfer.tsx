import React, { useState } from 'react';
import { TextField, Button, ListItem, Checkbox, ListItemText, Paper, List, Typography, Grid } from '@mui/material';
import TransferList from '../components/TransferList';
import { Check, CheckBox, Label, LabelImportant } from '@mui/icons-material';
import AuctionCard from './AuctionCard';
import { useWallet } from '@/utilities';

export const ApproveCardForTransferStep = ({ setPassable, selectedCard }) => {
    const [approved, setApproved] = useState(false);
    const wallet = useWallet();
    function handleApproveClick() {
        // Call to the CardContact
        // Then make the passableTrue
        wallet?.cardmanagerContract.approve(wallet?.cardmanagerContract.address, selectedCard.tokenId).then(() => {
            console.log("Approved!");
            // For now just approve
            setPassable(true)
        })
    }

    function handleApproveClickCheckbox() {
        setPassable(!approved);
        setApproved(!approved)
    }

    var isPromiseResolved = true;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{width: "600px"}}>
                        <Typography>You picked the card: {selectedCard.url}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h3'>This is important!</Typography>
                    <Typography variant='h4'>You need to approve the transfer for the contracts address. You can do this by the button below.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleApproveClick}>Approve the NFT Transfer</Button>
                </Grid>
                <Grid item xs={12}>
                    <ListItem dense>
                        <ListItemText>I approved the NFT Transfer</ListItemText>
                        <Checkbox
                        checked={approved}
                        onChange={handleApproveClickCheckbox}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </ListItem>
                </Grid>
            </Grid>
        </div>
    );
}

// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//   };

//   return (
    
//   );