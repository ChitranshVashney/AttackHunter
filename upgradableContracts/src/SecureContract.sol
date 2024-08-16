// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./VulnerableContract.sol";

contract SecureContract is VulnerableContract {
    // Overridden withdraw function to fix the reentrancy vulnerability
    function withdraw(uint256 amount) public override whenNotPaused {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Effects: Update the balance before the external call
        balances[msg.sender] -= amount;

        // Interaction: Make the external call
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
