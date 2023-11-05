import { useNavigate } from 'react-router-dom';
import { checkAccount, useWallet } from '@/utilities'
import styles from '../../styles.module.css'
import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CardContent, CardActions, Typography } from '@mui/material';
import AuctionCard from '@/components/AuctionCard';
import ShowPath from "../../components/ShowPath";
import AuctionCardDetailed from '@/components/AuctionCardDetailed';
import MyAppBar from '@/components/MyAppBar';

const mockDataAuction = {
    cardName: "Zattirizortzort",
    from: "0x38d4BAd320711715F4f3B6F41916762e5f2E2F84",
    sellersTokenId: 23,
    auctionId: 2,
    biddedCardName: "Pika Pika", 
    bidder: "0x47a45BAd320711715F4f3B6F234234135323125", 
    biddersTokenId: 42 
};

export const AuctionInfoPage = () => {
    const { ID } = useParams();
    const navigate = useNavigate();
    const [noBidder, setNoBidder] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const wallet = useWallet();

    // Get the auction id info
    function acceptAndExchange() {
        
    }

    function rejectOffer() {
        
    }

    function cancelAuction() {
        
    }

    return (
        <Grid container spacing={3}>
            <MyAppBar />
            <ShowPath />
            <Grid item xs={12}>
                <h1>Auction Info</h1>
                <AuctionCardDetailed data={mockDataAuction} navigate={navigate} noBidder={noBidder} showOffer={showOffer}></AuctionCardDetailed>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={acceptAndExchange} disabled={wallet?.details.account?.toLowerCase() == mockDataAuction.from}>Accept and Exchange</Button>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={rejectOffer} disabled={wallet?.details.account?.toLowerCase() == mockDataAuction.from}>Reject</Button>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={cancelAuction} disabled={wallet?.details.account?.toLowerCase() == mockDataAuction.from}>Cancel Auction</Button>
            </Grid>
        </Grid>
    );
}