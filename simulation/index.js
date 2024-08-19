// Installation: npm install alchemy-sdk
import { Alchemy, Network, AlchemySubscription } from "alchemy-sdk";
import runFunctionsConcurrently from "./utils/trace.js";

const settings = {
  apiKey: "Ee0UaMxXnSpJbdrlQbt0SS_BO9IPHCa9",
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

alchemy.ws.on(
  {
    method: AlchemySubscription.PENDING_TRANSACTIONS,
    fromAddress: "0xbAf59B045c6B53bCc849e2a487C14F234435cC51".toLowerCase(), //remove this
  },
  (tx) => {
    let transaction = {
      from: tx.from,
      to: tx.to,
      value: tx.value,
      data: tx.input,
    };
    runFunctionsConcurrently(
      transaction,
      "0xA7C73b5fbd3A38C1E4C3E2749D570e6DA9f0C811".toLowerCase()
    );
  }
);
