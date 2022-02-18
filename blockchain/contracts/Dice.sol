// contracts/Dice.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import './DiceLibrary.sol';

contract TabletopDiceNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using DiceLibrary for DiceLibrary.DiceStorage;
    DiceLibrary.DiceStorage diceNFTs;

    Counters.Counter private _tokenIds;
    
    constructor() ERC721 ("TabletopDiceNFT", "TabletopDice") {
        // TODO: Create a bunch on genesis...
    }

    function mintNFT(address owner, string memory name, uint8 sides, string memory tokenURI) 
        public onlyOwner returns (uint256) 
    {
        // Start at id #1
        _tokenIds.increment();

        uint256 newId = _tokenIds.current();
        // TODO: This or DiceLibrary.Dice.tokenURI - which is better?
        _safeMint(owner, newId);
        _setTokenURI(newId, tokenURI);
        diceNFTs.createDice(name, newId, sides, this.tokenURI(newId));

        console.log("Created NFT: #%s; Sides: %s", newId, sides);

        return newId;
    }

    // TODO: Add geometry, TokenURI
    function getTraits(uint256 tokenId) view public
        returns (string memory name, string memory tokenURI, uint8 sides) {
        return diceNFTs.getTraits(tokenId);
    }

    function roll(uint256 tokenId) view public returns (uint8) {
        console.log("ROLLING NFT #", tokenId);
        return diceNFTs.doRoll(tokenId);
    }

}