// Installation: npm install alchemy-sdk
import { Alchemy, Network, AlchemySubscription } from "alchemy-sdk";
import runFunctionsConcurrently from "./trace";

const settings = {
  apiKey: "Ee0UaMxXnSpJbdrlQbt0SS_BO9IPHCa9",
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

alchemy.ws.on(
  {
    method: AlchemySubscription.PENDING_TRANSACTIONS,
    toAddress: "0x7C798C3dA56B194139f8CD94FEC47912F5Ef8fd2".toLowerCase(), //remove this
  },
  (tx) => {
    console.log(tx);
    let transaction = {
      from: tx.from,
      to: tx.to,
      value: tx.value,
      data: tx.input,
    };
    console.log(transaction);
    runFunctionsConcurrently(tx, "0xA7C73b5fbd3A38C1E4C3E2749D570e6DA9f0C811");
  }
);
