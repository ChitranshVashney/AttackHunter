// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./VulnerableContract.sol";

contract SecureContract is VulnerableContract {
    // Overridden withdraw function to fix the reentrancy vulnerability
    function withdraw() public override whenNotPaused {
        require(balances[msg.sender] >= 0, "Insufficient balance");

        // Effects: Update the balance before the external call
        balances[msg.sender] = 0;

        // Interaction: Make the external call
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "Transfer failed");
    }
}
