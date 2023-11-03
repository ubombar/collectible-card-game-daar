// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Ownable.sol";
import "./CardManager.sol";

import {Market} from "./Market.sol";
import {IMarket} from "./IMarket.sol";

contract Main is Ownable { 
  uint256 private count;
  CardManager public cardManager;
  IMarket public marketManager;


  constructor() {
    count = 0;
    isAdmin[msg.sender] = true;
    cardManager = new CardManager(); 
    marketManager = new Market(cardManager);
  }
}
