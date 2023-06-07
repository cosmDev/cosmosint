import { defineNode, NodeInterface, TextInterface } from "baklavajs";
import axios from "axios";
import getCosmosConfig from "../cosmos.config.js";


function truncate(
  fullStr,
  strLen = 8,
  separator = "...",
  frontChars = 8,
  backChars = 8
) {
  if (fullStr.length <= strLen) return fullStr;

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
}

export const WalletNode = defineNode({
  type: "WalletNode",
  title: "Wallet",
  inputs: {
    wallet: () => new NodeInterface("Wallet", ""),
    chain: () => new NodeInterface("Chain", "")
  },
  outputs: {
    displayWallet: () => new TextInterface("Display", ""),
    displayChain: () => new TextInterface("Display", ""),
    walletAvailable: () => new NodeInterface("Available", "")
  },
  async calculate({ wallet, chain }) {
    let findChain = getCosmosConfig.find( ({ name }) => name === chain )
    console.log('findChain', findChain)
    // Get wallet info
    const accountInfo = await axios(
      findChain.apiURL +
        "/cosmos/bank/v1beta1/spendable_balances/" +
        wallet
    );
    let foundAccountInfo = accountInfo.data.balances.find(
      (element) =>
        element.denom === findChain.coinLookup.chainDenom
    );

    if (typeof foundAccountInfo === "undefined") {
      foundAccountInfo = {
        denom: findChain.coinLookup.chainDenom,
        amount: "0",
      };
    }


    return {
      displayWallet: truncate(wallet),
      displayChain: String(chain),
      walletAvailable: (foundAccountInfo.amount / 1000000).toFixed(4) + ' ' + findChain.coinLookup.viewDenom
    };
  }
});
 
