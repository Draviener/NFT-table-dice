// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library DiceLibrary {
    struct Dice {
        string name;
        uint8 sides;
        // TODO: Store colors as bytes3, and translate to hex chars
        string fgColor;
        string bgColor;
        uint8 font;
        bool zeroBased;
    }

    struct DiceStorage {
        mapping(uint256 => Dice) dice;
    }

    function createDice(
        DiceStorage storage self,
        uint256 tokenId,
        string calldata name,
        uint8 sides,
        string calldata fgColor,
        string calldata bgColor,
        uint8 font
    ) internal {
        require(sides > 0, "Sides must be non-zero");

        bool zeroBased = (sides == 10) ? true : false; // Only D10s have "0"
        self.dice[tokenId] = Dice(
            name,
            sides,
            fgColor,
            bgColor,
            font,
            zeroBased
        );
    }

    // URI path is composed of attributes
    function getTokenURIpath(DiceStorage storage self, uint256 tokenId)
        internal
        view
        returns (string memory)
    {
        // TODO: add other dice attributes in later commit
        // return(string(abi.encodePacked("/", self.dice[tokenId].sides,"/", self.dice[tokenId].sides)));
        return "/sides/color/font";
    }

    function getTraits(DiceStorage storage self, uint256 tokenId)
        public
        view
        returns (
            string memory name,
            uint8 sides,
            string memory fgColor,
            string memory bgColor,
            uint8 font
        )
    {
        return (
            self.dice[tokenId].name,
            self.dice[tokenId].sides,
            self.dice[tokenId].fgColor,
            self.dice[tokenId].bgColor,
            self.dice[tokenId].font
        );
    }

    function random(uint16 nonce) private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encode(
                        block.difficulty,
                        block.timestamp,
                        msg.sender,
                        nonce
                    )
                )
            );
    }

    function doRoll(
        DiceStorage storage self,
        uint256 tokenId,
        uint16 nonce
    ) public view returns (uint8) {
        // TODO: Is there a better/cheaper way to do !(bool) -> int
        uint8 offset = (self.dice[tokenId].zeroBased) ? 0 : 1;
        uint8 result = uint8(
            (random(nonce) % self.dice[tokenId].sides) + offset
        );
        return result;
    }
}
