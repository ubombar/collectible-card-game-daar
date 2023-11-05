import { useState } from 'react'
import styles from '../styles.module.css'
import { Button, List, ListItem, Grid, Card, CardMedia, CardContent, CardHeader } from '@mui/material';
import { useWallet } from "../utilities"
import { BigNumber, ethers } from 'ethers';

import ShowPath from '@/components/ShowPath';
import MyAppBar from '../components/MyAppBar'

export const BoosterPage = () => {
    const wallet = useWallet()
    const account = wallet?.details.account;
    const [boosters, setBoosters] = useState<Number[]>([]); // TODO: change to array of booster IDs
    const [redeemedItems, setRedeemedItems] = useState<string[]>([]);


    wallet?.mainContract.on("BoosterMinted", (boosterId: BigNumber) => {
        // setBoosters and filter out duplicates
        setBoosters([...boosters.filter((id) => id !== boosterId.toNumber()), boosterId.toNumber()]);
    })

    wallet?.mainContract.on("BoosterRedeemed", (resCardIds: string[], owner: string) => {
        // setRedeemedItems and filter out duplicates
        setRedeemedItems([...redeemedItems.filter((id) => !resCardIds.includes(id)), ...resCardIds]);
        setBoosters([]);
    })

    wallet?.mainContract.on("BoosterBurned", (boosterId: BigNumber, owner: string) => {
        setBoosters([...boosters.filter((id) => id !== boosterId.toNumber())]);
    })


    const handleBuyBooster = () => {
        // retrieve booster cardIds from backend
        const cardIds = ["rare", "uncommon", "common"]//backend.getBoosterCardIds(enteredCode)
        // call mint booster function
        wallet?.mainContract
            .mintBooster(cardIds, account, { value: ethers.utils.parseEther("1.0") })
            .catch(console.error)
    };

    const handleCollectAll = () => {
        //call redeem booster function
        for (let i = 0; i < boosters.length; i++) {
            wallet?.mainContract
                .redeemBooster(boosters[i], account)
                .catch(console.error)
        }
    };

    const handleBurnAll = () => {
        //call burn booster function
        for (let i = 0; i < boosters.length; i++) {
            wallet?.mainContract
                .burnBooster(boosters[i], account)
                .catch(console.error)
        }
    }


    return (
        <div className={styles.body}>
        <ShowPath/>
        <MyAppBar/>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={6}>
                <h3>Boosters</h3>
                <p>Click on a booster to collect it</p>
                <Button variant="contained" onClick={handleBuyBooster}>
                    Buy Booster
                </Button>
                <p>List of your boosters:</p>
                <List>
                    {boosters?.map((booster, index) => (
                        <ListItem key={index}> {booster} </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={6}>
                <h3>Rewards</h3>
                <List>
                    {redeemedItems?.map((item, index) => (
                        <ListItem key={index}>
                            {item}
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={handleCollectAll}>
                    Collect All
                </Button>
                <Button variant="contained" onClick={handleBurnAll}>
                    Trash All
                </Button>
            </Grid>
        </Grid>
        </div>
    );
};

