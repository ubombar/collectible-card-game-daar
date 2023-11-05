// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CardManager.sol";

contract BoosterManager is Ownable, ERC721 {
  struct Booster {
    uint256 tokenId;
    string[] cards;
    bool redeemed;
    uint256 expireDate;
  }

  CardManager public cardManager;

  uint256 public constant MAX_BOOSTERS = 10;
  uint256 public mintedBoosterNumber;

  mapping(uint256 => Booster) public boosters;
  mapping(address => uint256) public receiverToNumberOfMintedBoosters;

  constructor(address _owner, CardManager _cardManager) ERC721("Booster", "Boostersymbol") Ownable(_owner) {
    cardManager = _cardManager;
    mintedBoosterNumber = 0; // acts as booster tokenId
  }

  function mintBooster(
    string[] memory cardIds,
    address _boosterOwner
  ) external returns( uint256){ // only owner is referring to the contract owner (admin), not the owner of the booster
    // check if the user has ever minted
    require(
      receiverToNumberOfMintedBoosters[_boosterOwner] < MAX_BOOSTERS,
      "Max boosters minted for this address"
    );
    uint256 boosterId = mintedBoosterNumber;
    uint256 timer = block.timestamp + 10 days;
    boosters[boosterId] = Booster(
      boosterId,
      cardIds,
      false,
      timer
    );
    _safeMint(_boosterOwner, boosterId);
    mintedBoosterNumber++;
    return boosterId;
  }

  function redeemBooster(
    uint256 boosterId,
    address _boosterOwner
  ) external returns (string[] memory){ // only owner is referring to the contract owner (admin), not the owner of the booster
    require(ownerOf(boosterId) == _boosterOwner, "Not the owner of the booster");
    require(!boosters[boosterId].redeemed, "Booster already redeemed");
    boosters[boosterId].redeemed = true;
    // from CardManager mint cards
    for (uint256 i = 0; i < boosters[boosterId].cards.length; i++) {
      cardManager.mint(_boosterOwner, boosters[boosterId].cards[i], "booster");
    }
    return boosters[boosterId].cards;
  }

  function burnBooster(
    uint256 boosterId,
    address _boosterOwner
  ) external { // only owner is referring to the contract owner (admin), not the owner of the booster
    require(ownerOf(boosterId) == _boosterOwner, "Not the owner of the booster");
    require(!boosters[boosterId].redeemed, "Booster already redeemed");
    _burn(boosterId);
  }
}
