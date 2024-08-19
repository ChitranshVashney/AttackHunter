
## Slither Analysis Report

**Project Root:** ../upgradableContracts  
**Timestamp:** 2024-08-19T04:42:32.771Z



### Output


 **Detectors Found** 

ReentrancyAttacker.attack() (src/ReentrancyAttacker.sol#25-29) sends eth to arbitrary user
Dangerous calls:
- vulnerableContract.deposit{value: attackAmount}() (src/ReentrancyAttacker.sol#27)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#functions-that-send-ether-to-arbitrary-destinations

 **Detectors Found** 

UUPSProxy is re-used:
- UUPSProxy (src/ReentrancyAttacker.sol#12)
- UUPSProxy (src/UUPSProxy.sol#6-11)
VulnerableContract is re-used:
- VulnerableContract (src/ReentrancyAttacker.sol#4-10)
- VulnerableContract (src/VulnerableContract.sol#9-45)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#name-reused

 **Detectors Found** 

Reentrancy in VulnerableContract.withdraw() (src/VulnerableContract.sol#28-35):
External calls:
- (success) = msg.sender.call{value: balances[msg.sender]}() (src/VulnerableContract.sol#31)
State variables written after the call(s):
- balances[msg.sender] = 0 (src/VulnerableContract.sol#34)
VulnerableContract.balances (src/VulnerableContract.sol#15) can be used in cross function reentrancies:
- VulnerableContract.balances (src/VulnerableContract.sol#15)
- VulnerableContract.deposit() (src/VulnerableContract.sol#23-25)
- VulnerableContract.withdraw() (src/VulnerableContract.sol#28-35)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

 **Detectors Found** 

SecureContract.withdraw() (src/SecureContract.sol#8-17) contains a tautology or contradiction:
- require(bool,string)(balances[msg.sender] >= 0,Insufficient balance) (src/SecureContract.sol#9)
VulnerableContract.withdraw() (src/VulnerableContract.sol#28-35) contains a tautology or contradiction:
- require(bool,string)(balances[msg.sender] >= 0,Insufficient balance) (src/VulnerableContract.sol#29)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#tautology-or-contradiction

 **Detectors Found** 

ERC1967Utils.upgradeToAndCall(address,bytes) (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Utils.sol#83-92) ignores return value by Address.functionDelegateCall(newImplementation,data) (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Utils.sol#88)
ERC1967Utils.upgradeBeaconToAndCall(address,bytes) (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Utils.sol#173-182) ignores return value by Address.functionDelegateCall(IBeacon(newBeacon).implementation(),data) (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Utils.sol#178)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unused-return

 **Detectors Found** 

UUPSProxy.constructor(address,bytes)._implementation (src/UUPSProxy.sol#8) shadows:
- ERC1967Proxy._implementation() (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol#37-39) (function)
- Proxy._implementation() (lib/openzeppelin-contracts/contracts/proxy/Proxy.sol#51) (function)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#local-variable-shadowing

 **Detectors Found** 

Proxy._delegate(address) (lib/openzeppelin-contracts/contracts/proxy/Proxy.sol#22-45) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/proxy/Proxy.sol#23-44)
Address._revert(bytes) (lib/openzeppelin-contracts/contracts/utils/Address.sol#146-158) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/Address.sol#151-154)
StorageSlot.getAddressSlot(bytes32) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#59-64) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#61-63)
StorageSlot.getBooleanSlot(bytes32) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#69-74) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#71-73)
StorageSlot.getBytes32Slot(bytes32) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#79-84) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#81-83)
StorageSlot.getUint256Slot(bytes32) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#89-94) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#91-93)
StorageSlot.getStringSlot(bytes32) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#99-104) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#101-103)
StorageSlot.getStringSlot(string) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#109-114) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#111-113)
StorageSlot.getBytesSlot(bytes32) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#119-124) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#121-123)
StorageSlot.getBytesSlot(bytes) (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#129-134) uses assembly
- INLINE ASM (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#131-133)
OwnableUpgradeable._getOwnableStorage() (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#30-34) uses assembly
- INLINE ASM (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#31-33)
Initializable._getInitializableStorage() (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol#223-227) uses assembly
- INLINE ASM (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol#224-226)
PausableUpgradeable._getPausableStorage() (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#27-31) uses assembly
- INLINE ASM (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#28-30)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#assembly-usage

 **Detectors Found** 

Different versions of Solidity are used:
- Version used: ['0.8.20', '^0.8.10', '^0.8.20']
- 0.8.20 (src/ReentrancyAttacker.sol#2)
- 0.8.20 (src/UUPSProxy.sol#2)
- 0.8.20 (src/VulnerableContract.sol#2)
- ^0.8.10 (src/SecureContract.sol#2)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/interfaces/draft-IERC1822.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Utils.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/Proxy.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/beacon/IBeacon.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/utils/Address.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#5)
- ^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/utils/ContextUpgradeable.sol#4)
- ^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#4)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#different-pragma-directives-are-used

 **Detectors Found** 

Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/interfaces/draft-IERC1822.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Utils.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/Proxy.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/proxy/beacon/IBeacon.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/utils/Address.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#5) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/utils/ContextUpgradeable.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.20 (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#4) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version0.8.20 (src/ReentrancyAttacker.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version^0.8.10 (src/SecureContract.sol#2) allows old versions
Pragma version0.8.20 (src/UUPSProxy.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
Pragma version0.8.20 (src/VulnerableContract.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.8.18.
solc-0.8.20 is not recommended for deployment
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity

 **Detectors Found** 

Low level call in Address.sendValue(address,uint256) (lib/openzeppelin-contracts/contracts/utils/Address.sol#41-50):
- (success) = recipient.call{value: amount}() (lib/openzeppelin-contracts/contracts/utils/Address.sol#46)
Low level call in Address.functionCallWithValue(address,bytes,uint256) (lib/openzeppelin-contracts/contracts/utils/Address.sol#83-89):
- (success,returndata) = target.call{value: value}(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#87)
Low level call in Address.functionStaticCall(address,bytes) (lib/openzeppelin-contracts/contracts/utils/Address.sol#95-98):
- (success,returndata) = target.staticcall(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#96)
Low level call in Address.functionDelegateCall(address,bytes) (lib/openzeppelin-contracts/contracts/utils/Address.sol#104-107):
- (success,returndata) = target.delegatecall(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#105)
Low level call in SecureContract.withdraw() (src/SecureContract.sol#8-17):
- (success) = msg.sender.call{value: balances[msg.sender]}() (src/SecureContract.sol#15)
Low level call in VulnerableContract.withdraw() (src/VulnerableContract.sol#28-35):
- (success) = msg.sender.call{value: balances[msg.sender]}() (src/VulnerableContract.sol#31)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls

 **Detectors Found** 

Function OwnableUpgradeable.__Ownable_init(address) (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#51-53) is not in mixedCase
Function OwnableUpgradeable.__Ownable_init_unchained(address) (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#55-60) is not in mixedCase
Constant OwnableUpgradeable.OwnableStorageLocation (lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol#28) is not in UPPER_CASE_WITH_UNDERSCORES
Function UUPSUpgradeable.__UUPSUpgradeable_init() (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol#65-66) is not in mixedCase
Function UUPSUpgradeable.__UUPSUpgradeable_init_unchained() (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol#68-69) is not in mixedCase
Variable UUPSUpgradeable.__self (lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol#22) is not in mixedCase
Function ContextUpgradeable.__Context_init() (lib/openzeppelin-contracts-upgradeable/contracts/utils/ContextUpgradeable.sol#18-19) is not in mixedCase
Function ContextUpgradeable.__Context_init_unchained() (lib/openzeppelin-contracts-upgradeable/contracts/utils/ContextUpgradeable.sol#21-22) is not in mixedCase
Function PausableUpgradeable.__Pausable_init() (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#56-58) is not in mixedCase
Function PausableUpgradeable.__Pausable_init_unchained() (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#60-63) is not in mixedCase
Constant PausableUpgradeable.PausableStorageLocation (lib/openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol#25) is not in UPPER_CASE_WITH_UNDERSCORES
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#conformance-to-solidity-naming-conventions

 **Detectors Found** 

ReentrancyAttacker.attackAmount (src/ReentrancyAttacker.sol#17) should be constant
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#state-variables-that-could-be-declared-constant

 **Detectors Found** 

ReentrancyAttacker.proxy (src/ReentrancyAttacker.sol#16) should be immutable
ReentrancyAttacker.vulnerableContract (src/ReentrancyAttacker.sol#15) should be immutable
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#state-variables-that-could-be-declared-immutable
