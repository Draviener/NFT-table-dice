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

    function getColorTheme(uint styleId) internal pure returns(
        string memory background, string memory forground
    ) {
        require(styleId <= 30, "style out of range");

        if ((styleId >= 0) && (styleId <= 3)) {
            background = '00134e';
        } else if ((styleId >= 4) && (styleId <= 7)) {
            background = '1a1a1a';
        } else if ((styleId >= 8) && (styleId <= 10)) {
            background = 'ffffff';
        } else if ((styleId >= 11) && (styleId <= 13)) {
            background = '555753';
        } else if ((styleId >= 14) && (styleId <= 16)) {
            background = '8b10d0';
        } else if ((styleId >= 17) && (styleId <= 19)) {
            background = 'ecdc19';
        } else if ((styleId == 20) || (styleId == 21)) {
            background = '408fdd';
        } else if ((styleId == 22) || (styleId == 23)) {
            background = '317a26';
        } else if ((styleId == 24) || (styleId == 25)) {
            background = 'f21d0a';
        } else if (styleId == 26) {
            background = '88ff44';
        } else if (styleId == 27) {
            background = 'd09c10';
        } else if (styleId == 28) {
            background = 'ef54da';
        } else if (styleId == 29) {
            background = '4e0000';
        } else if (styleId == 30) {
            background = '0000ff';
        }

        if ((styleId == 0) ||
            (styleId == 4) ||
            (styleId == 8) ||
            (styleId == 17) ||
            (styleId == 26)) {
            forground = '0000ff';
        } else if ((styleId == 1) ||
            (styleId == 5)) {
            forground = '00ff00';
        } else if ((styleId == 2) ||
            (styleId == 6) ||
            (styleId == 10) ||
            (styleId == 19) ||
            (styleId == 28)) {
            forground = 'ff0000';
        } else if ((styleId == 3) ||
            (styleId == 7) ||
            (styleId == 13) ||
            (styleId == 16) ||
            (styleId == 21) ||
            (styleId == 23) ||
            (styleId == 25) ||
            (styleId == 29) ||
            (styleId == 30)) {
            forground = 'ffffff';
        } else if ((styleId == 9) ||
            (styleId == 11) ||
            (styleId == 14) ||
            (styleId == 18) ||
            (styleId == 20) ||
            (styleId == 27)) {
            forground = '000000';
        }  else if ((styleId == 12) ||
            (styleId == 22)) {
            forground = '88ff88';
        }  else if (styleId == 15) {
            forground = '66cc66';
        }  else if (styleId == 24) {
            forground = '880000';
        } 

        return (background, forground);
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