// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol";

contract VulnerableContract is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    mapping(address => uint256) public balances;

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __Pausable_init();
    }

    // Deposit function with a reentrancy vulnerability
    function deposit() public payable whenNotPaused {
        balances[msg.sender] += msg.value;
    }

    // Withdraw function with a reentrancy vulnerability
    function withdraw(uint256 amount) public virtual whenNotPaused {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
