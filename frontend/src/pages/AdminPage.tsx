import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { checkAccount } from '@/utilities'
import styles from '../styles.module.css'
//import React from 'react';
import { Grid, List, ListItem, TextField, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
//import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
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

export const AdminPage = () => {
  
  //periodic update
  const navigate = useNavigate();
  checkAccount(navigate)

  const [userSearchText, setUserSearchText] = useState('');//state of the searchbar for users
  const [collectionSearchText, setCollectionSearchText] = useState('');//state of the searchbar for collection
  /*const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(userSearchText.toLowerCase())
  );*/

  const handleMintClick = () => {
    console.log('Mint button clicked');
    //what do I do??
  };
  
  return(
  <div className={styles.body}>
    <h1>Admin Page</h1>
    <Grid container spacing={3}>
      <Grid item xs={6} style={{ alignItems: 'center' }}>
        <h2>Collections</h2>
        <div>
            {/* Searchbar for collections */}
            <TextField
              label="Search collections"
              variant="outlined"
              value={collectionSearchText}
              onChange={(e) => setCollectionSearchText(e.target.value)}
            />
          </div>
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
          {
            collectionsData.filter((collection) =>
              collection.name.toLowerCase().includes(collectionSearchText.toLowerCase())).map((collection, collectionIndex) => (
              <TreeItem
                key={collectionIndex}
                nodeId={`collection-${collectionIndex}`}
                label={
                  <Link
                    component="button"
                    onClick={() => navigate(`/CollectionInfoPage/${collection.name}`)} // navigate to the page with the collection info
                    style={{ cursor: 'pointer' }}
                  >
                  {collection.name}
                  </Link>
                }
              >
              {
                collection.cards.map((card, cardIndex) => (
                  <TreeItem
                    key={`card-${collectionIndex}-${cardIndex}`}
                    nodeId={`card-${collectionIndex}-${cardIndex}`}
                    label={
                      <Link
                        component="button"
                        onClick={() => navigate(`/CardInfoPage/${card.id}`)} // navigate to the page with the card info
                        style={{ cursor: 'pointer' }}
                      >
                      {card.url}
                      </Link>
                    }
                    />
                  ))
              }
                </TreeItem>
              ))
            }
        </TreeView>
      </Grid>
      <Grid item xs={6} style={{ alignItems: 'center' }}>
          <h2>Users</h2>
          <div>
            {/* Searchbar */}
            <TextField
              label="Search user"
              variant="outlined"
              value={userSearchText}
              onChange={(e) => setUserSearchText(e.target.value)}/*change the value of searchText when the textField input changes*/
            />
          </div>
          <List>
            {usersData.filter((user) =>user.name.toLowerCase().includes(userSearchText.toLowerCase())).map((user) => (
              <ListItem key={user.id}>
                <Link 
                  component="button"
                  onClick={() => navigate(`/UserInfoPage/${user.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {user.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleMintClick}>
            Mint
      </Button>
    </div>
    )
};


