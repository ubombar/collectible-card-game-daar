import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CardContent, CardActions, Typography, Button, Paper, Grid } from '@mui/material';



export default function AuctionCardDetailed({ data: { cardName, biddedCardName, from, bidder, biddersTokenId, sellersTokenId, auctionId }, navigate, noBidder, showOffer }) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Paper>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Auctioned Card: <a href={"/CardInfoPage/" + cardName}>{cardName}</a>
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                From: <a href={"/UserInfoPage/" + from}>{from}</a>
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                TokenId: {sellersTokenId}
                            </Typography>
                        </CardContent>
                    </Grid>
                    {noBidder ? (
                        <Grid item xs={6}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Offered Card: There is no offer :/
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    From: "N/A"
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    TokenId: "N/A"
                                </Typography>

                            </CardContent>

                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Offered Card: <a href={"/CardInfoPage/" + biddedCardName}>{biddedCardName}</a>
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    From: <a href={"/UserInfoPage/" + from}>{bidder}</a>
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    TokenId: {biddersTokenId}
                                </Typography>
                            </CardContent>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {showOffer ? (<div>
                        <Typography variant="body2">
                            {auctionId}
                        </Typography>
                        <CardActions>
                            <Button onClick={() => { navigate("/UserPage/AuctionPage/BidforAuctionPage/" + auctionId) }} size="small">Offer a Card for Exchange</Button>
                        </CardActions>
                    </div>) : (<div>

                    </div>)}
                </Grid>

            </Paper>
        </React.Fragment>
    );
}
