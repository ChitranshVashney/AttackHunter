// Installation: npm install alchemy-sdk
import { Alchemy, Network, AlchemySubscription } from "alchemy-sdk";
import runFunctionsConcurrently from "./utils/trace.js";
import dotenv from "dotenv";
dotenv.config();

const settings = {
  apiKey: process.env.API_PROVIDER,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

alchemy.ws.on(
  {
    method: AlchemySubscription.PENDING_TRANSACTIONS,
    // fromAddress: "",
  },
  (tx) => {
    let transaction = {
      from: tx.from,
      to: tx.to,
      value: tx.value,
      data: tx.input,
    };
    console.log(
      "---------------------------------Mempool Tx-----------------------------------------------"
    );
    console.log(transaction);
    runFunctionsConcurrently(
      transaction,
      "0xA7C73b5fbd3A38C1E4C3E2749D570e6DA9f0C811".toLowerCase()
    );
  }
);
