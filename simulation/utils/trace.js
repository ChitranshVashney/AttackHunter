import { ethers } from "ethers";
import sendNotificationEmail from "./mail.js";
import sendTx from "./rawTx.js";
import runSlitherAnalysis from "./reporting.js";
import dotenv from "dotenv";
dotenv.config();

async function txSimulationasync(tx) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_simulateAssetChanges",
      params: [tx],
    }),
  };

  const result = await fetch(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_PROVIDER}`,
    options
  );
  let jsonFormat = await result.json();
  if (jsonFormat.result) {
    console.log("Result:", jsonFormat.result);
    return jsonFormat.result.changes;
  } else if (jsonFormat.error) {
    console.log("Error:", jsonFormat.error.message);
    return [];
  } else {
    console.log("No result or error found in the response.");
    return [];
  }
}

async function getEthBalance(address) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/Ee0UaMxXnSpJbdrlQbt0SS_BO9IPHCa9"
    );

    const balance = await provider.getBalance(address);

    return balance.toString();
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}

export default async function runFunctionsConcurrently(tx, address) {
  const simulationResult = await txSimulationasync(tx);
  const balanceResult = await getEthBalance(address);
  if (simulationResult.length > 0) {
    for (let i in simulationResult) {
      if (
        // true
        balanceResult == simulationResult[i].rawAmount && //if trasaction take all the balance of smart contract
        simulationResult[i].from.toLowerCase() == address.toLowerCase() // address of smart contract is eqal to address that drain funds
      ) {
        console.log("----------Transaction capture------------");
        console.log(tx);
        console.log("----------Sending Tx to Pause the contract----------");
        await sendTx();
        console.log("----------Smart Contract Paused----------");
        console.log("----------Semding Email----------");
        await sendNotificationEmail(tx, simulationResult[0]);
        console.log("----------Email sent----------");
        await runSlitherAnalysis();
        return;
      }
    }
  }
  console.log(
    "--------------------------------------------------------------------------------"
  );
}
