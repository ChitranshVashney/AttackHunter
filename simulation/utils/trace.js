import { ethers } from "ethers";
import sendNotificationEmail from "./mail.js";
import sendTx from "./rawTx.js";
import runSlitherAnalysis from "./reporting.js";

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
    "https://eth-sepolia.g.alchemy.com/v2/cVwdK73itOgjoDvxZcN4Z4oxJvqGfca-",
    options
  );
  let jsonFormat = await result.json();
  // console.log(jsonFormat.result.changes);
  return jsonFormat.result.changes;
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
    console.log("----------Transaction capture------------");
    console.log(tx);

    // for (let i in simulationResult) {
    // if (balanceResult == simulationResult[i].rawAmount) {
    console.log("----------Sending Tx to Pause the contract----------");
    await sendTx();
    console.log("----------Smart Contract Paused----------");
    console.log("----------Semding Email----------");
    await sendNotificationEmail(tx, simulationResult[0]);
    console.log("----------Email sent----------");
    await runSlitherAnalysis();
    return;
    // }
    // }
  }
}
