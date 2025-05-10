// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IV3Pool} from "./IV3Pool.sol";
import {IERC20} from "./IERC20.sol";
import {TransferHelper} from "./TransferHelper.sol";
import {Ownable} from "./Ownable.sol";

contract SwapCallback is Ownable {
    mapping(address => bool) public whiteListedPools;

    function whiteListPool(address pool) external onlyOwner {
        whiteListedPools[pool] = true;
    }

    function _swapCallback(int256 amount0, int256 amount1) internal {
        require(whiteListedPools[msg.sender], "Caller is not the pool address");
        IV3Pool pool = IV3Pool(msg.sender);
        address token0 = pool.token0();
        address token1 = pool.token1();

        if (amount0 > 0) {
            require(
                IERC20(token1).balanceOf(address(this)) >= uint256(-amount1),
                "SwapCallback failed"
            );
            TransferHelper.safeTransfer(
                token0,
                address(pool),
                uint256(amount0)
            );
        }
        if (amount1 > 0) {
            require(
                IERC20(token0).balanceOf(address(this)) >= uint256(-amount0),
                "SwapCallback failed"
            );
            TransferHelper.safeTransfer(
                token1,
                address(pool),
                uint256(amount1)
            );
        }
    }

    function uniswapV3SwapCallback(
        int256 amount0,
        int256 amount1,
        bytes calldata
    ) external {
        _swapCallback(amount0, amount1);
    }

    function pancakeV3SwapCallback(
        int256 amount0,
        int256 amount1,
        bytes calldata
    ) external {
        _swapCallback(amount0, amount1);
    }
}
