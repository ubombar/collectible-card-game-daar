import React, { useState } from 'react';
import { TextField, Button, ListItem, Checkbox, ListItemText, Paper, List } from '@mui/material';
import TransferList from '../components/TransferList';

const SingleCardSelectorStep = ({ cards, setPassable, setSelectedCardUpper }) => {
    const [selectedCard, setSelectedCard] = useState({id: -1});
    const [cardSearchText, setCardSearchText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleToggle = (card) => () => {
        // const selectedCard = cards.indexOf(card);

        setSelectedCard(card);
        setSelectedCardUpper(card)
        setPassable(true);
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={2} style={{ width: '600px', margin: '20px' }}>
                    <List dense component="div" role="list">
                        {cards.filter((card) => {return cardSearchText.length == 0 || card.id.includes(cardSearchText)}).map((card) => {
                            const labelId = `checkbox-list-label-${card.id}`;
                            return (

                                <ListItem key={card.id} role={undefined} dense onClick={handleToggle(card)} >
                                    {/* <Checkbox
                                        edge="start"
                                        checked={false}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    /> */}
                                    <ListItemText primary={card.url + `[${card.url}]`} />
                                    <Button disabled={selectedCard?.tokenId == card.tokenId}>{selectedCard?.tokenId == card.tokenId ? "Selected" : "Use This Card"}</Button>
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>

            </div>
        </div>
    );
};

export default SingleCardSelectorStep;