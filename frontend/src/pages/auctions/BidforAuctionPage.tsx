import { useWallet } from '@/utilities';
import styles from '../../styles.module.css'
import { Button, Grid, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useParams } from 'react-router-dom';
import AuctionView from '@/components/AuctionView';


export const BidforAuctionPage = () => {
    const wallet = useWallet();
    const navigate = useNavigate();


    return (
        <div className={styles.body}>
            Auction bid page
        </div>
    );
}; 