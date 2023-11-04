import { useNavigate } from 'react-router-dom';
import { checkAccount } from '@/utilities'
import styles from '../../styles.module.css'
import React from 'react';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CardContent, CardActions, Typography } from '@mui/material';
import AuctionCard from '@/components/AuctionCard';
import ShowPath from "../../components/ShowPath";

const mockDataAuction = {
    cardName: "Zattirizortzort",
    from: "0x38d4BAd320711715F4f3B6F41916762e5f2E2F84",
    sellersTokenId: 23,
    auctionId: 2,
};

export const AuctionInfoPage = () => {
    const { ID } = useParams();
    const navigate = useNavigate();

    return (
        <Grid container spacing={3}>
                <ShowPath />
            <Grid item xs={12}>
                <h1>Auction Info</h1>
                <AuctionCard data={mockDataAuction} navigate={navigate}></AuctionCard>
            </Grid>
        </Grid>
    );
}