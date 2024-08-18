import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config();
import { ethers } from "ethers";

const proxyContractAddress = "0xA7C73b5fbd3A38C1E4C3E2749D570e6DA9f0C811";
const abi = ["function pause()"];
const contractInterface = new ethers.utils.Interface(abi);
const data = contractInterface.encodeFunctionData("pause");
let wallet = new Wallet(process.env.PRIVATE_KEY);

const settings = {
  apiKey: process.env.API_PROVIDER,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

export default async function sendTx() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let transaction = {
    to: proxyContractAddress,
    value: Utils.parseEther("0"),
    gasLimit: "80000",
    maxPriorityFeePerGas: Utils.parseUnits("10", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    data: data,
    nonce: nonce,
    type: 2,
    chainId: 11155111,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  let txx = await tx.wait();
  console.log("Sent transaction", txx);
}
