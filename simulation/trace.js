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

  const result = fetch(
    "https://eth-sepolia.g.alchemy.com/v2/cVwdK73itOgjoDvxZcN4Z4oxJvqGfca-",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.result.changes;
    })
    .catch((err) => console.error(err));

  return result;
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
  const [simulationResult, balanceResult] = await Promise.all([
    txSimulationasync(tx),
    getEthBalance(address),
  ]);
  console.log("Simulation Result:", simulationResult);
  console.log("Balance Result:", balanceResult);

  for (let i in simulationResult) {
    if (balanceResult == simulationResult[i].rawAmount) {
      await sendTx();
      await sendNotificationEmail(tx, simulationResult[i]);
      runSlitherAnalysis();
    }
  }
}
