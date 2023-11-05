/*import React, { useState } from 'react';
import { List, ListItem, Checkbox, TextField } from '@mui/material';

const SelectCardsStep = ({ cards, isComplete, max }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardSearchText, setCardSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = (cardId) => () => {
    const selectedIndex = selectedCards.indexOf(cardId);
    const newSelected = [...selectedCards];

    if (selectedIndex === -1) {
      newSelected.push(cardId);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedCards(newSelected);
    isComplete(newSelected.length > 0 && newSelected.length<=max);
    if(newSelected.length > max)
    {setErrorMessage("You should select a maximum of " + max + " cards!")}//show error message "You should choose only one user!"
    else
    {setErrorMessage('')};
  };

  return (
    <div>
      <h2>Select cards to mint</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        
        <TextField
                label="Search card"
                variant="outlined"
                value={cardSearchText}
                onChange={(e) => setCardSearchText(e.target.value)}
                />
    </div>
      <List>
        {cards.filter((card) =>card.url.toLowerCase().includes(cardSearchText.toLowerCase())).map((card) => {
          const labelId = `checkbox-list-label-${card.id}`;
          return (
            <ListItem key={card.id} role={undefined} dense onClick={handleToggle(card.id)}>
              <Checkbox
                edge="start"
                checked={selectedCards.includes(card.id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
              {card.url}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SelectCardsStep;*/
//use the transfer list
//add the constraint on the maximum number of cards to be selected which comes from the previous step
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import TransferList from '../components/TransferList';

const SelectCardsStep = ({ cards, isComplete, max }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardSearchText, setCardSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = (cardId) => () => {
    const selectedIndex = selectedCards.indexOf(cardId);
    const newSelected = [...selectedCards];

    if (selectedIndex === -1) {
      newSelected.push(cardId);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedCards(newSelected);
    isComplete(newSelected.length > 0 && newSelected.length <= max);
    if (newSelected.length > max) {
      setErrorMessage(`You should select a maximum of ${max} cards!`);
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h2>Select cards to mint</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>

        <TextField
          label="Search card"
          variant="outlined"
          value={cardSearchText}
          onChange={(e) => setCardSearchText(e.target.value)}
        />
      </div>
      {/* <TransferList
        left={cards.filter((card) =>card.url.toLowerCase().includes(cardSearchText.toLowerCase()))}
        right={cards.filter((card)=>selectedCards.includes(card.id))}
        handleToggle={handleToggle}
      /> */}

      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={2} style={{ width: '200px', margin: '20px' }}>
          <List dense component="div" role="list">
            {cards.map((card) => {
              const labelId = `checkbox-list-label-${card.id}`;
              return (
                <ListItem key={card.id} role={undefined} dense onClick={handleToggle(card.id)} >
                  <Checkbox
                    edge="start"
                    checked={cards.includes(card)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                  <ListItemText primary={card.url} />
                </ListItem>
              );
            })}
          </List>
        </Paper> */}
    </div>
  );
};

export default SelectCardsStep;