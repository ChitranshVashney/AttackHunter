// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../src/VulnerableContract.sol";
import "../src/SecureContract.sol";
import "../src/UUPSProxy.sol";
import "../src/ReentrancyAttacker.sol";

contract VulnerableContractTest is Test {
    VulnerableContract public impl;
    UUPSProxy public proxy;
    ReentrancyAttacker public attacker;

    function setUp() public {
        impl = new VulnerableContract();
        proxy = new UUPSProxy(address(impl), "");

        address(proxy).call(abi.encodeWithSignature("initialize()"));

        // Deploy the attacker contract
        attacker = new ReentrancyAttacker(address(proxy));
    }

    function testDeposit() public {
        address(proxy).call{value: 1 ether}(
            abi.encodeWithSignature("deposit()")
        );
        (, bytes memory data) = address(proxy).call(
            abi.encodeWithSignature("balances(address)", address(this))
        );
        assertEq(abi.decode(data, (uint256)), 1 ether);
    }

    function testWithdraw() public {
        address(proxy).call{value: 1 ether}(
            abi.encodeWithSignature("deposit()")
        );
        (bool success, ) = address(proxy).call(
            abi.encodeWithSignature("withdraw()")
        );
        assertTrue(success);
    }
    // Function to start the attack
    function testReentrancyAttack() public {
        // Fund the proxy contract with 3 ether
        address(proxy).call{value: 0.1 ether}(
            abi.encodeWithSignature("deposit()")
        );

        // Start the attack
        attacker.attack{value: 1 ether}();

        assertEq(address(proxy).balance, 0 ether);
    }

    fallback() external payable {}
}

contract SecureContractTest is Test {
    VulnerableContract impl;
    SecureContract impl2;
    UUPSProxy proxy;

    function setUp() public {
        impl = new VulnerableContract();
        proxy = new UUPSProxy(address(impl), "");
        address(proxy).call(abi.encodeWithSignature("initialize()"));
        address(proxy).call{value: 1 ether}(
            abi.encodeWithSignature("deposit()")
        );

        impl2 = new SecureContract();
        address(proxy).call(
            abi.encodeWithSignature("upgradeTo(address)", address(impl2))
        );
    }

    function testWithdrawAfterUpgrade() public {
        (bool success, ) = address(proxy).call(
            abi.encodeWithSignature("withdraw()")
        );
        assertTrue(success);
    }
    fallback() external payable {}
}
