// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Ownable.sol";

contract CardManager is Ownable, ERC721 {
  struct Card {
    string id;
    uint256 tokenId;
    address user;
  }
  mapping(uint256 => Card) tokenIdToCard; //card id to Card object
  mapping(string => uint256) public cardIdToTokenId; //card id to token id
  uint256 public mintedCardNumber; // number of cards minted

  constructor() ERC721("Card", "Cardsymbol") {
    mintedCardNumber = 0;
  }

  function mint(address _to, string memory _cardId) public onlyOwner{
    _safeMint(_to, mintedCardNumber);
    // if _safeMint is successful, then create a Card object and add it to the mapping
    Card memory card = Card({
      id: _cardId,
      user: _to,
      tokenId: mintedCardNumber
    });
    tokenIdToCard[mintedCardNumber] = card;
    mintedCardNumber++;
  }

  function userToCards(address _user) public view returns (Card[] memory) {
    uint256 count = balanceOf(_user);
    // create array of cards (using the count to set the size)
    Card[] memory cards = new Card[](uint256(count));
    count = 0;
    for (uint256 i = 0; i < mintedCardNumber; i++) {
      if (tokenIdToCard[i].user == _user) {
        cards[count] = tokenIdToCard[i];
        count++;
      }
    }
    return cards;
  }
}
