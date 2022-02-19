// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

/**
 * @dev A simplified version of ERC721Enumerable to only keep the _ownedTokens and save gas
 * @author https://github.com/Lcressot
 * NOTE: Requires sequential tokenId minting, allows 2^16 (65k) NFTs minted
 */
abstract contract ERC721SimpleEnumerable is ERC721 {
    // Mapping from owner to list of owned token IDs
    mapping(address => uint16[]) private _ownedTokens;

    uint256 public tokensMinted;
    uint256 public tokensBurnt;

    function totalSupply() public view returns (uint256){
        return tokensMinted - tokensBurnt;
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint16) {
        require(index < ERC721.balanceOf(owner), "ERC721SimpleEnumerable: owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    /**
     * @dev Get list of tokens ids owned by an owner
     */
    function tokenListOfOwner(address owner) public view virtual returns (uint16[] memory) {
        return _ownedTokens[owner];
    }    

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId); // also keeps trace of burnt tokens
            if (from!=address(0)) {
                _removeTokenFromOwnerEnumeration(from, tokenId);
            }else{ // minting
                tokensMinted++;
            }
            if (to==address(0)){ // burning
                tokensBurnt++;
            }
        }      
    }

    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     * @param to address representing the new owner of the given token ID
     * @param tokenId uint256 ID of the token to be added to the tokens list of the given address
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokens[to].push(uint16(tokenId));
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures.
     * @param from address representing the previous owner of the given token ID
     * @param tokenId uint256 ID of the token to be removed from the tokens list of the given address
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        uint16[] storage ownerList = _ownedTokens[from];
        uint tokenIndex = ownerList.length;
        for(uint i=0; i<ownerList.length; i++){
            if(ownerList[i] == uint16(tokenId)){
                tokenIndex = i;
                break;
            }
        }
        require(tokenIndex < ownerList.length, "ERC721SimpleEnumerable: tokenId not found in owner list");
        for (uint i = tokenIndex; i<ownerList.length-1; i++){
            ownerList[i] = ownerList[i+1];
        }
        ownerList.pop();
    }

}
