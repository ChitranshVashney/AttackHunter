// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import "../src/VulnerableContract.sol";
import "../src/SecureContract.sol";
import "../src/ReentrancyAttacker.sol";
import "../src/UUPSProxy.sol";

contract Deploy is Script {
    UUPSProxy public proxy;
    VulnerableContract public vulnerableImpl;
    SecureContract public secureImpl;
    ReentrancyAttacker public attacker;

    function run() public {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        console.log("Deploying contracts with address", vm.addr(pk));
        vm.startBroadcast(pk);
        _deployInitialVersion();
        //_upgradeImplementation();
        //_deployAttacker();
        vm.stopBroadcast();
        console.log("Contracts deployed");
    }

    // Deploy the initial vulnerable contract and proxy
    function _deployInitialVersion() internal {
        // Deploy the vulnerable implementation contract
        vulnerableImpl = new VulnerableContract();

        // Deploy the UUPS proxy pointing to the vulnerable implementation
        proxy = new UUPSProxy(address(vulnerableImpl), "");

        // Initialize the vulnerable implementation via proxy
        address(proxy).call(abi.encodeWithSignature("initialize()"));

        console.log("Vulnerable contract deployed and initialized");
    }

    // Upgrade to the secure implementation
    function _upgradeImplementation() internal {
        // Deploy the secure implementation contract
        secureImpl = new SecureContract();

        // Upgrade the proxy to point to the secure implementation
        address(proxy).call(
            abi.encodeWithSignature("upgradeTo(address)", address(secureImpl))
        );

        console.log("Upgraded to secure contract");
    }

    // Deploy the reentrancy attacker contract
    function _deployAttacker() internal {
        // Deploy the attacker contract
        attacker = new ReentrancyAttacker(address(proxy));

        console.log("Reentrancy attacker contract deployed");
    }
}
