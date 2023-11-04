import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {CardContent, CardActions, Typography, Button} from '@mui/material';

export default function AuctionCard({data: { cardName, from, sellersTokenId, auctionId }, naviage}) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Offering: <a href={"/CardInfoPage/" + cardName}>{cardName}</a>
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    From: <a href={"/UserInfoPage/" + from}>{from}</a>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    TokenId: {sellersTokenId}
                </Typography>
                <Typography variant="body2">
                    {auctionId}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => {naviage("/BifforAuctionPage/" + auctionId)}} size="small">Offer a Card for Exchange</Button>
                <Button onClick={() => {naviage("/AuctionInfoPage/" + auctionId)}} size="small">See Details</Button>
            </CardActions>
        </React.Fragment>
    );
}
