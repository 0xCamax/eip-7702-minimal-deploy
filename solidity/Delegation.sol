// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Proxy.sol";
import {Ownable} from "./Ownable.sol";

contract Delegation is Proxy, Ownable {
    address public implementation;

    constructor() {}

    function setImplementation(address _newImplementation) external onlyOwner {
        implementation = _newImplementation;
    }

    function _implementation() internal view override returns (address) {
        return implementation;
    }

    receive() external payable {}
}
