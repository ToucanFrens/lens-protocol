// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.10;

/**
 * @title IToucanOffsetHelper
 *
 */
interface IToucanOffsetHelper {
    /**
     * @notice Retire carbon credits using the lowest quality (oldest) TCO2
     * tokens available from the specified Toucan token pool by sending MATIC.
     * Use `calculateNeededETHAmount()` first in order to find out how much
     * MATIC is required to retire the specified quantity of TCO2.
     *
     * This function:
     * 1. Swaps the Matic sent to the contract for the specified pool token.
     * 2. Redeems the pool token for the poorest quality TCO2 tokens available.
     * 3. Retires the TCO2 tokens.
     *
     * @dev If the user sends much MATIC, the leftover amount will be sent back
     * to the user.
     *
     * @param _poolToken The address of the Toucan pool token that the
     * user wants to use, for example, NCT or BCT.
     * @param _amountToOffset The amount of TCO2 to offset.
     *
     * @return tco2s An array of the TCO2 addresses that were redeemed
     * @return amounts An array of the amounts of each TCO2 that were redeemed
     */
    function autoOffsetUsingETH(address _poolToken, uint256 _amountToOffset)
        external
        payable
        returns (address[] memory tco2s, uint256[] memory amounts);
}
