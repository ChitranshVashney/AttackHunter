# AttackHunter: Smart Contract with Vulnerability and Exploit Detection

This project demonstrates an upgradeable smart contract with built-in vulnerability detection and prevention mechanisms. It showcases a comprehensive system that integrates both on-chain and off-chain components to safeguard the smart contract from attacks.
![alt text](image-1.png)

## Overview

This repository contains two main components:

1. **Off-Chain Simulation**: Off-chain microservices are responsible for detecting potential vulnerabilities in real-time. These services monitor Ethereum transactions, simulate outcomes, and trigger preventive actions such as sending notifications and running security analyses.
   ![alt text](image.png)
2. **Upgradeable Smart Contract**: Deployed using the UUPS (Universal Upgradeable Proxy Standard) pattern, this contract includes a deliberately introduced reentrancy vulnerability to simulate an attack scenario. It features a mechanism for upgrading the contract to fix vulnerabilities without affecting user data.
   ![alt text](image-2.png)

## Project Structure

```
AttackHunter/
│
├── upgradableContracts/   # Smart contract deployment
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   └── ...
│
└── simulation/            # Off-chain detection and prevention system
    ├── utils/
    ├── index.js
    └── ...

```

## Key Features:

- Upgradeable Contract: The smart contract uses the UUPS proxy pattern, allowing it to be upgraded after deployment, ensuring that vulnerabilities can be fixed without disrupting the user experience.

- Reentrancy Vulnerability: The project includes a vulnerable contract with a reentrancy issue, a secure contract that fixes the vulnerability, and an attacker contract that simulates the exploit.

- Off-Chain Monitoring: Off-chain microservices listen to blockchain events, simulate transactions, and detect potential attacks. When an attack is detected, notifications are sent, and security analyses are triggered.

## Setup

- [Upgradeable Smart Contract](https://github.com/ChitranshVashney/AttackHunter/blob/master/upgradableContracts/README.md#setup-instructions)
- [Off-Chain Simulation](https://github.com/ChitranshVashney/AttackHunter/blob/master/simulation/README.md#setup-instructions)

### Contract Addresses

- [Upgradable Smart Contract](https://sepolia.etherscan.io/address/0xa7c73b5fbd3a38c1e4c3e2749d570e6da9f0c811)
- [Upgrading Smart Contract tx](https://sepolia.etherscan.io/tx/0x5eadcb92b3bb49989795134141ce5303cced204d54996ca2f6766093b1e9508c)
- [Failed attack Tx](https://sepolia.etherscan.io/tx/0xb41b0d8de6eb3f921a9e81bb5858c507057c409875fefae5c22e3a8b6b20a6b9)
- [Smart Contract Pause](https://sepolia.etherscan.io/tx/0xe2594fb98f6964f48408b7fbeb3d863649018b1e935be28a3443093bda44930b)
