// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library DiceLibrary {

    struct Dice {
        string name;
        string tokenURI;
        uint8 sides;
        bool zeroBased;
        Geometries geometry;
    }

    struct DiceStorage {
        mapping(uint256 => Dice) dice;
    }

    enum Geometries {
        Standard,
        Rhombic,
        Elongated
    }

    function createDice(DiceStorage storage self, string memory name, uint256 tokenId, uint8 sides, string memory tokenURI) internal {
        require(sides > 0, "Sides must be non-zero");

        console.log("Creating Die w/ id: ", tokenId);

        // TODO: Have these settable by the caller
        Geometries geometry = Geometries.Standard;
        // TODO: Do any dice besides D10 have "0" faces?
        bool zeroBased = (sides == 10) ? true : false;
        self.dice[tokenId] = Dice(name, tokenURI, sides, zeroBased, geometry);
    }

    function getTraits(DiceStorage storage self, uint256 tokenId) public view 
        returns (string memory name, string memory tokenURI, uint8 sides) {
        return (self.dice[tokenId].name, self.dice[tokenId].tokenURI, self.dice[tokenId].sides);
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, msg.sender)));
    }

    function doRoll(DiceStorage storage self, uint256 tokenId) public view returns (uint8) {
        // TODO: Is there a better/cheaper way to do !(bool) -> int
        uint offset = (self.dice[tokenId].zeroBased) ? 0 : 1;
        console.log("Rolling the dice!");
        console.log("tokenId: ", tokenId);
        console.log("Sides: ", self.dice[tokenId].sides);

        uint8 result = uint8((random() % self.dice[tokenId].sides) + offset);
        console.log("+++++ RESULT: ", result);
        return result;
    }
}