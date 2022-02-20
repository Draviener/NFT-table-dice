// contracts/Dice.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import './DiceLibrary.sol';
import './ERC721SimpleEnumerable.sol';

contract TabletopDiceNFT is Ownable, ERC721SimpleEnumerable {
    using Counters for Counters.Counter;
    using DiceLibrary for DiceLibrary.DiceStorage;
    DiceLibrary.DiceStorage diceNFTs;

    Counters.Counter private _tokenIds;
    string private _baseURIvalue;
    
    constructor() ERC721("PolyDice: Dice Rolling Dapp", "PolyDice") {
    }

    function setBaseURI(string calldata baseURI) public onlyOwner {
        _baseURIvalue = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIvalue;
    }

    function mintNFT(address owner, string memory name, uint8 sides) 
        public onlyOwner returns (uint256) 
    {
        // NOTE: Start at id #0
        uint256 newId = _tokenIds.current();
        diceNFTs.createDice(name, newId, sides);
        _safeMint(owner, newId);
        _tokenIds.increment();

        return newId;
    }

    function getOwnedTokenIds() public view returns (uint256[] memory) {
        uint256 ownedCnt = balanceOf(msg.sender);
        uint256[] memory tokenIds = new uint256[](ownedCnt);
        for (uint i = 0; i < ownedCnt; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(msg.sender, i);
        }
        return tokenIds;
    }

    // TODO: Add new attributes
    function getTraits(uint256 tokenId) view public
        returns (string memory name, string memory tokenURI, uint8 sides) {
        return diceNFTs.getTraits(tokenId);
    }

    function roll(uint256 tokenId, uint16 nonce) view public returns (uint8) {
        require(msg.sender == ownerOf(tokenId), "Ah Ah Ah, you didn't say the magic word! (This isn't your NFT.)");
        return diceNFTs.doRoll(tokenId, nonce);
    }

}