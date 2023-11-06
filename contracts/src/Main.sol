// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CardManager.sol";
import "./BoosterManager.sol";

import {Market} from "./Market.sol";
import {IMarket} from "./IMarket.sol";

contract Main is Ownable { 
  uint256 private count;
  CardManager public cardManager;
  IMarket public marketManager;
  BoosterManager public boosterManager;

  event BoosterMinted(uint256 boosterId);
  event BoosterRedeemed(string[] cardIds, address redeemer);
  event BoosterBurned(uint256 boosterId, address burner);

  constructor(address _cardManagerAddress, address _marketAddress) Ownable(msg.sender){
    count = 0;
    cardManager = CardManager(_cardManagerAddress); 
    marketManager = Market(_marketAddress);
    boosterManager = new BoosterManager(owner(),cardManager);
  }

  // Wrappers for functions from CardManager.sol
  function mintCard(address _to, string memory _cardId, string memory _collectionName) external onlyOwner {
    cardManager.mint(_to, _cardId, _collectionName);
  }

  function transferCard(address _to, string memory _cardId) external onlyOwner {
    cardManager.transferCard(_to, _cardId);
  }

  function userToCardNames(address _user) external view onlyOwner returns (string[] memory) {
    return cardManager.userToCardNames(_user);
  }

    function userToCards(address _user) external view onlyOwner returns (CardManager.Card[] memory) {
    return cardManager.userToCards(_user);
  }

  // Wrappers for functions from BoosterManager.sol
  function mintBooster(string[] memory cardIds, address _boosterOwner) external payable {
    require(msg.value >= 1, "Not enough ETH sent; check price!");
    uint256 res_boosterId =boosterManager.mintBooster(cardIds, _boosterOwner);
    emit BoosterMinted(res_boosterId);
  }

  function redeemBooster(uint256 boosterId, address _boosterOwner) external {
    string[] memory res_cardIds = boosterManager.redeemBooster(boosterId, _boosterOwner);
    emit BoosterRedeemed(res_cardIds, _boosterOwner);
  }

  function burnBooster(uint256 boosterId, address _boosterOwner) external {
    boosterManager.burnBooster(boosterId, _boosterOwner);
    emit BoosterBurned(boosterId, _boosterOwner);
  }

}
