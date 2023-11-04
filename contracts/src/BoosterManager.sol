// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BoosterManager is Ownable, ERC721 {
  struct Booster {
    uint256 tokenId;
    uint256[] cards;
    bool redeemed;
    uint256 expireDate;
  }

  uint256 public mintedBoosterNumber; // number of boosters minted
  uint256 public constant MAX_BOOSTERS = 10;

  mapping(uint256 => Booster) public boosters;

  event BoosterMinted(uint256 boosterId, string[] cardIds);
  event BoosterRedeemed(uint256 boosterId, address redeemer);
  event BoosterBurned(uint256 boosterId, address burner);

  constructor() ERC721("Booster", "Boostersymbol")  Ownable(msg.sender){
    mintedBoosterNumber = 0;
  }

  function mintBooster(string[] memory cardIds) external payable onlyOwner {
    require(mintedBoosterNumber < MAX_BOOSTERS, "Max boosters minted");
    require(msg.value >= 2, "Not enough ETH sent; check price!");
    uint256[] memory cardIdsInt = new uint256[](cardIds.length);
    for (uint256 i = 0; i < cardIds.length; i++) {
      cardIdsInt[i] = uint256(keccak256(abi.encodePacked(cardIds[i])));
    }
    uint256 boosterId = mintedBoosterNumber;
    uint256 timer = block.timestamp+10 days;
    boosters[boosterId] = Booster(boosterId, cardIdsInt, false, timer);
    _safeMint(msg.sender, boosterId);
    mintedBoosterNumber++;
    emit BoosterMinted(boosterId, cardIds);
  }

  function redeemBooster(uint256 boosterId) external onlyOwner{
    require(ownerOf(boosterId) == msg.sender, "Not the owner of the booster");
    require(!boosters[boosterId].redeemed, "Booster already redeemed");
    boosters[boosterId].redeemed = true;
    emit BoosterRedeemed(boosterId, msg.sender);
  }

  function  burnBooster (uint256 boosterId) external onlyOwner{
    require(ownerOf(boosterId) == msg.sender, "Not the owner of the booster");
    require(!boosters[boosterId].redeemed, "Booster already redeemed");
    _burn(boosterId);
    emit BoosterBurned(boosterId, msg.sender);
  }
}
