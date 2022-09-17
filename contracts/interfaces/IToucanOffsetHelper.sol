// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.10;

/**
 * @title IToucanOffsetHelper
 *
 */
interface IToucanOffsetHelper {
    /**
     * @notice Retire carbon credits using the lowest quality (oldest) TCO2
     * tokens available from the specified Toucan token pool by sending ERC20
     * tokens (USDC, WETH, WMATIC). Use `calculateNeededTokenAmount` first in
     * order to find out how much of the ERC20 token is required to retire the
     * specified quantity of TCO2.
     *
     * This function:
     * 1. Swaps the ERC20 token sent to the contract for the specified pool token.
     * 2. Redeems the pool token for the poorest quality TCO2 tokens available.
     * 3. Retires the TCO2 tokens.
     *
     * Note: The client must approve the ERC20 token that is sent to the contract.
     *
     * @dev When automatically redeeming pool tokens for the lowest quality
     * TCO2s there are no fees and you receive exactly 1 TCO2 token for 1 pool
     * token.
     *
     * @param _depositedToken The address of the ERC20 token that the user sends
     * (must be one of USDC, WETH, WMATIC)
     * @param _poolToken The address of the Toucan pool token that the
     * user wants to use, for example, NCT or BCT
     * @param _amountToOffset The amount of TCO2 to offset
     *
     * @return tco2s An array of the TCO2 addresses that were redeemed
     * @return amounts An array of the amounts of each TCO2 that were redeemed
     */
    function autoOffsetUsingToken(
        address _depositedToken,
        address _poolToken,
        uint256 _amountToOffset
    ) external returns (address[] memory tco2s, uint256[] memory amounts);
}
