// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CardManager is Ownable, ERC721 {
  struct Card {
    string id;
    uint256 tokenId;
  }

  mapping(uint256 => Card) public tokenIdToCard; //card id to Card object

  mapping (string => Card []) public collectionNameToCards; //from collectionName to array of cards
  mapping (uint256 => string) public idToCollectionName;
  mapping (string => uint256) public collectionNameToCardNumber; //from collectionName to number of cards (max
  
  
  uint256 public mintedCardNumber; // number of cards minted
  uint256 public numberOfCollections; //number of created collections


  constructor() ERC721("Card", "Cardsymbol") Ownable(msg.sender){
    mintedCardNumber = 0;
    numberOfCollections = 0;
  }

  function mint(address _to, string memory _cardId, string memory _collectionName) public {
    _safeMint(_to, mintedCardNumber);
    // if _safeMint is successful, then create a Card object and add it to the mapping
    Card memory card = Card({
      id: _cardId,
      tokenId: mintedCardNumber
    });
    tokenIdToCard[mintedCardNumber] = card;
    mintedCardNumber++;
    collectionNameToCards[_collectionName].push(card);
  }

//assign card to a user
  function transferCard(address _to, string memory _cardId) public{
    // retrieve token id from card id by looping through all cards
    uint256 _tokenId;
    for (uint256 i = 0; i < mintedCardNumber; i++) {
      // compare the card id with the card id of the current card --> use keccak256 to compare strings
      if (keccak256(abi.encodePacked(tokenIdToCard[i].id)) == keccak256(abi.encodePacked(_cardId))) {
        _tokenId = i;
        break;
      }
    }
    
    _safeTransfer(ownerOf(_tokenId), _to, _tokenId, "");
  }

  function userToCards(address _user) public view returns (Card[] memory) {
    uint256 count = balanceOf(_user);
    // create array of cards (using the count to set the size)
    Card[] memory cards = new Card[](uint256(count));
    count = 0;
    for (uint256 i = 0; i < mintedCardNumber; i++) {
      if (ownerOf(i) == _user) {
        cards[count] = tokenIdToCard[i];
        count++;
      }
    }
    return cards;
  }

  function getAllUsers () public view returns (address[] memory) {
    address[] memory result = new address[](uint256(mintedCardNumber));
    for (uint256 i = 0; i < mintedCardNumber; i++) {
      address user = ownerOf(i);
      result[i] = user;
    }
    return result;
  }


  function userToCardNames(address _user) public view returns (string[] memory) {
    uint256 count = balanceOf(_user);
    // create array of cards (using the count to set the size)
    string[] memory cards = new string[](uint256(count));
    count = 0;
    for (uint256 i = 0; i < mintedCardNumber; i++) {
      if (ownerOf(i) == _user) {
        cards[count] = tokenIdToCard[i].id;
        count++;
      }
    }
    return cards;
  }

// ------------------ Collection functions ------------------
  function createCollection(
    string memory _collectionName,
    uint256 _cardNumberMax
  ) external {
    collectionNameToCardNumber[_collectionName] = _cardNumberMax;
    idToCollectionName[numberOfCollections] = _collectionName;
    numberOfCollections++;
  }

  function getAllCollections() public view returns (string[] memory) {
    string[] memory result = new string[](uint256(numberOfCollections));
    for (uint256 i = 0; i < numberOfCollections; i++) {
      string memory collectionName = idToCollectionName[i];
      result[i] = collectionName;
    }
    return result;
  }

  function getCardsFromCollection(
    string memory collectionName
  ) public view returns (Card[] memory) {
    Card[] memory result = new Card[](uint256(collectionNameToCards[collectionName].length));
    for (uint256 i = 0; i < collectionNameToCards[collectionName].length; i++) {
      result[i] = collectionNameToCards[collectionName][i];
    }
    return result;
  }
}
