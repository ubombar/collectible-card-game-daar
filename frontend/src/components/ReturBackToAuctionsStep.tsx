import React, { useState } from 'react';
import { TextField, Button, ListItem, Checkbox, ListItemText, Paper, List, Typography, Grid } from '@mui/material';
import TransferList from '../components/TransferList';
import { Check, CheckBox, Label, LabelImportant } from '@mui/icons-material';
import AuctionCard from './AuctionCard';

export const ReturBackToAuctionsStep = ({ setPassable, lastPageMessage }) => {
    setPassable(true);
    return (
        <div>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Typography variant='h3'>Now what?</Typography>
                    <Typography variant='h4'>{lastPageMessage}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}