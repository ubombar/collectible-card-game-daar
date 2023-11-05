import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CardContent, CardActions, Typography, Button, Card } from '@mui/material';

export default function AuctionCard({ data: { cardName, from, sellersTokenId, auctionId }, navigate }) {
    const theme = useTheme();

    return (
        <Card>
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
                <Button onClick={() => { navigate("/UserPage/AuctionPage/BidforAuctionPage/" + auctionId) }} size="small">Offer a Card for Exchange</Button>
                <Button onClick={() => { navigate("/AuctionInfoPage/" + auctionId) }} size="small">See Details</Button>
            </CardActions>
        </Card>
    );
}
