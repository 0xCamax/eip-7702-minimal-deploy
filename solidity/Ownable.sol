// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


abstract contract Ownable {
    modifier onlyOwner() {
        require(msg.sender == owner());
        _;
    }

    function owner() public view returns (address) {
        return address(this);
    }
}