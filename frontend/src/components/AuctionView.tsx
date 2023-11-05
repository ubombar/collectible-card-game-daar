
import React, { useState } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { Grid, List, ListItem, TextField, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AuctionCard from "./AuctionCard";

// auctionId: auctionId,
// statusInt: statusInt,
// status: statusToString[statusInt],
// sellerAddress: await wallet.marketContract.sellerOf(auctionId),
// biddderAddress: await wallet.marketContract.currentBidderOf(auctionId),
// sellersToken: await wallet.marketContract.sellersTokenIdOf(auctionId),
// biddersToken: await wallet.marketContract.currentBiddersTokenIdOf(auctionId),
// hasBidder: biddersAddress.includes("0x0000000000000000000000000000000000000000"),

const AuctionView = ({auctionCollection, navigate}) => {
    const [searchText, setSearchText] = useState('');
    const filteredCollections = auctionCollection
                  .filter((collection) => {
                    return collection.sellersToken.toLowerCase().includes(searchText.toLowerCase());
                  });
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <h2>Open Auctions</h2>
            </Grid>
            <Grid item xs={12}>
                <TextField
                            label="Search Cards of the Auctions"
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
            </Grid>
            <Grid item xs={12}>
                <List>
                    {filteredCollections.map((cardData) => {
                        return (
                        <ListItem>
                            <AuctionCard data={cardData} navigate={navigate}></AuctionCard>
                        </ListItem>);
                    })}
                </List>
            </Grid>
        </Grid>
    )
}

export default AuctionView;

