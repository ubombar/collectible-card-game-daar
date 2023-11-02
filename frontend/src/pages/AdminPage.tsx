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
    cards: ['Card 1', 'Card 2', 'Card 3'],
  },
  {
    name: 'Collection 2',
    cards: ['Card 4', 'Card 5'],
  },
  // Other collections
];

export const AdminPage = () => {
  
  //periodic update
  const navigate = useNavigate();
  checkAccount(navigate)

  const [searchText, setSearchText] = useState('');//state of the searchbar
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      </Grid>
      <Grid item xs={6} style={{ alignItems: 'center' }}>
          <h2>Users</h2>
          <div>
            {/* Searchbar */}
            <TextField
              label="Search user"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <List>
            {filteredUsers.map((user) => (
              <ListItem key={user.id}>
                <Link 
                  component="button"
                  onClick={() => navigate(`/userInfoPage/${user.id}`)}
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
//In questo codice, ho utilizzato Grid per creare due colonne. La colonna di sinistra ha xs={6}, il che significa che occupa metà dello spazio disponibile (in una griglia di 12 colonne). La colonna di destra ha lo stesso xs={6}.

//Puoi inserire il contenuto specifico che desideri nella colonna di sinistra, e la lista degli utenti verrà mostrata nella colonna di destra.


/*return (

    <div>
      <h1>Admin Page</h1>
      <Grid container spacing={3}>
      <Grid item xs={6}>
          <h2>Tree View di Collezioni e Carte (Colonna di Sinistra)</h2>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {collectionsData.map((collection, index) => (
              <TreeItem key={index} nodeId={`collection-${index}`} label={collection.name}>
                {collection.cards.map((card, cardIndex) => (
                  <TreeItem
                    key={`card-${index}-${cardIndex}`}
                    nodeId={`card-${index}-${cardIndex}`}
                    label={card}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeView>
        </Grid>
        <Grid item xs={6}>
          <h2>Users</h2>
          <List>
            {usersData.map((user, index) => (
              <ListItem key={index}>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );*/
