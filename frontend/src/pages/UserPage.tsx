import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { checkAccount } from '@/utilities'
import styles from '../styles.module.css'
import { Grid, Button, Stack } from '@mui/material';
import { useWallet } from "../utilities"

import UsersList from "../components/UsersList";
import CollectionsTreeView from "../components/CollectionsTreeView";

import ShowPath from '../components/ShowPath';
import CardMTG from '@/components/CardMTG';
import { ethers } from 'ethers';
//layout
const usersData = [
  { id: 1, name: 'User 1', otherInfo: '...' },
  { id: 2, name: 'User 2', otherInfo: '...' },
  { id: 3, name: 'User 3', otherInfo: '...' },
];

const collectionsData = [
  {
    name: 'Collection 1',
    cardsCount: 3,
    cards: [
      {
        id: 1,
        url: "aaa"
      },
      {
        id: 2,
        url: "bbb"
      }, {
        id: 3,
        url: "ccc"
      }],
  },
  {
    name: 'Collection 2',
    cardsCount: 2,
    cards: [
      {
        id: 4,
        url: "ddd"
      },
      {
        id: 5,
        url: "eee"
      }],
  },
  // Other collections
];

export const UserPage = () => {
  const [number, setNumber] = useState<number>(0)
  const [cards, setCards] = useState<string[]>([]); 
  const wallet = useWallet();

  useEffect(() => {
    if (wallet?.details.account) {
        wallet?.cardmanagerContract.userToCards(wallet?.details.account)
    }
}, [wallet]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = wallet?.cardmanagerContract.userToCards(wallet.details.account)
      .then((cardArray: string[]) => {
        console.log(cardArray)
        // remove strings that has length less than 36 char
        cardArray = cardArray.filter((cardId) => cardId.length >= 36) //TODO: regex better formatting
          setCards(cardArray);
          console.log(cardArray)
      })
    }
    fetchCards();
  }
  , [wallet?.cardmanagerContract]);

  const navigate = useNavigate();
  checkAccount(navigate)

  function handleAuctionClick() {
    navigate("/UserPage/AuctionPage")
  }
  return (
    <div className={styles.body}>
      <h1>User Page</h1>
      <ShowPath />
      <h2>Inventory: my cards</h2>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          {/* <CollectionsTreeView collectionsData={collectionsData} navigate={navigate} /> */}
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                {cards?.map((id, index) => (
                    <CardMTG key={index} id={`${id}`} />
                ))}
            </Stack>
        </Grid>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          <UsersList usersData={usersData} navigate={navigate} />
        </Grid>
        <Button variant="contained" onClick={handleAuctionClick}>
          Auctions
        </Button>
      </Grid>
    </div>

  )
}