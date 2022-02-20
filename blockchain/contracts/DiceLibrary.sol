// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library DiceLibrary {

    struct Dice {
        string name;
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

    function createDice(DiceStorage storage self, string memory name, uint256 tokenId, uint8 sides) internal {
        require(sides > 0, "Sides must be non-zero");

        // TODO: Have these settable by the caller
        Geometries geometry = Geometries.Standard;
        // TODO: Do any dice besides D10 have "0" faces?
        bool zeroBased = (sides == 10) ? true : false;
        self.dice[tokenId] = Dice(name, sides, zeroBased, geometry);
    }

    // URI path is composed of attributes
    function getTokenURIpath(DiceStorage storage self, uint256 tokenId) internal view returns (string memory) {
        // TODO: add other dice attributes in later commit
        // return(string(abi.encodePacked("/", self.dice[tokenId].sides,"/", self.dice[tokenId].sides)));
        return "/sides/color/font";
    }

    function getTraits(DiceStorage storage self, uint256 tokenId) public view 
        returns (string memory name, string memory tokenURIpath, uint8 sides) {
        return (self.dice[tokenId].name, getTokenURIpath(self, tokenId), self.dice[tokenId].sides);
    }

    function random(uint16 nonce) private view returns(uint) {
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, msg.sender, nonce)));
    }

    function doRoll(DiceStorage storage self, uint256 tokenId, uint16 nonce) public view returns (uint8) {
        // TODO: Is there a better/cheaper way to do !(bool) -> int
        uint8 offset = (self.dice[tokenId].zeroBased) ? 0 : 1;
        uint8 result = uint8((random(nonce) % self.dice[tokenId].sides) + offset);
        return result;
    }
}