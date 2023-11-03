// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Collection.sol";
import "./Ownable.sol";
import "./CardManager.sol";

import {IMarket} from "./IMarket.sol";

contract Main is Ownable, CardManager { //is CardContract to inherit Card struct
  uint256 private count;
  CardManager private cardManager;
  mapping (string => uint256) private collectionNameToId;
  mapping (uint256 => string) private idToCollectionName;
  
  mapping(uint256 => Collection) private collections;
  mapping(uint256 => address) private collectionOwners;
  mapping(address => Collection[]) private ownerCollections;

  constructor() {
    count = 0;
    isAdmin[msg.sender] = true;
    cardManager = new CardManager(); 
  }

//integrate pokemon dataset: parameter cardcount (number of cards in the collection)
  function createCollection(
    string memory _collectionName,
    uint256 _cardNumberMax
  ) external returns (Collection) {
    Collection collection = new Collection(_collectionName, _cardNumberMax);
    collections[count] = collection; //count is the collection Id
    collectionNameToId[_collectionName] = count;
    count++;
    return collection;
  }

    //The Main contract will have an owner (i.e. a super-admin), which will be able to mint and assign cards to a selected user in a selected collection.
  function mintAndAssignCard(
    string memory _collectionName,
    string memory _cardId
  ) internal onlyAdmin {
    uint256 id = collectionNameToId[_collectionName];
    collections[id].mint(_cardId);
  }

  function mintAndAssignCards(
    string memory _collectionName,
    string[] memory _cardIds
  ) external onlyAdmin{
    for (uint256 i = 0; i < _cardIds.length; i++) {
      mintAndAssignCard(_collectionName, _cardIds[i]);
    }
  }

  function getAllCollections() public view returns (string[] memory) {
    Collection[] memory res = new Collection[](uint256(count));
    string[] memory collectionNames = new string[](uint256(count));
    uint256 index = 0;
    for (uint256 i = 0; i < count; i++) {
      res[index] = collections[i];
      collectionNames[index] = collections[i].collectionName();
      index++;
    }
    return collectionNames;
  }

  function getCardsFromCollection(
    string memory collectionName
  ) public view returns (string[] memory) {
    uint256 id = collectionNameToId[collectionName];
    Collection collection = collections[id];
    string[] memory result = new string[](uint256(collection.cardNumberMinted()));
    for (uint256 i = 0; i < collection.cardNumberMinted(); i++) {
      result[i] = collection.cards(i);
    }
    return result; 
  }

  function assignCardToUser(
    string memory _cardId,
    address _user
  ) public onlyAdmin {
    cardManager.mint(_user, _cardId);
  }

// main wrapper function that calls the CardManager getCardsOfUser
  function getCardsOfUser(address _user) public view returns (Card[] memory) {
    return cardManager.userToCards(_user);
  }

  function userOwnsCard(string memory _cardId, address _user) public view returns (bool){
    // retrieve the tokenId
    uint256 tokenId = cardManager.cardIdToTokenId(_cardId);
    return (cardManager.ownerOf(tokenId) == _user);
  }

}
