import { useWallet } from '@/utilities';
import styles from '../../styles.module.css'
import { Button, Grid, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useParams } from 'react-router-dom';
import AuctionView from '@/components/AuctionView';
import ShowPath from "../../components/ShowPath";

var auctionList = [
    {
        cardName: "Pikaçu",
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        sellersTokenId: 9482,
        auctionId: 0,
    },
    {
        cardName: "Zabadazibi",
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        sellersTokenId: 12312,
        auctionId: 1,
    },
    {
        cardName: "Zattirizortzort",
        from: "0x38d4BAd320711715F4f3B6F41916762e5f2E2F84",
        sellersTokenId: 23,
        auctionId: 2,
    },
    
];

export const AuctionPage = () => {
    const wallet = useWallet();
    const navigate = useNavigate();

    function handleCreateAuction() {
        navigate("/UserPage/AuctionPage/CreateAuctionPage");
    }

    return (
        <div className={styles.body}>
                <ShowPath />
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ alignItems: 'center' }}>
                <Button style={{width: '100%'}} variant="contained" color="secondary" onClick={handleCreateAuction}>
                    Create a New Auction
                </Button>
            </Grid>
            
            <Grid item xs={12}>
                <AuctionView auctionCollection={auctionList} navigate={navigate}></AuctionView>
            </Grid>
        </Grid>
        </div>
    );
}; 