import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { checkAccount } from '@/utilities'
import styles from '../styles.module.css'
import { Grid, Button} from '@mui/material';

import UsersList from "../components/UsersList";
import CollectionsTreeView from "../components/CollectionsTreeView";

//layout
const usersData = [
  { id: 1, name: 'User 1', otherInfo: '...'},
  { id: 2, name: 'User 2', otherInfo: '...'},
  { id: 3, name: 'User 3', otherInfo: '...'},
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
    console.log("ciao")
    
    const navigate = useNavigate();
    checkAccount(navigate)

    function buttonClick() {
      console.log("1 click")
      setNumber(number+1)
    }
    return (
    <div className={styles.body}>
      <h1>User Page</h1>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
        <CollectionsTreeView collectionsData={collectionsData} navigate={navigate} />
        </Grid>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          <UsersList usersData={usersData} navigate={navigate} />
        </Grid>
      </Grid>
    </div>

    )
  }