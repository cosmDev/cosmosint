import { defineNode, NodeInterface, TextInterface } from "baklavajs";
import getCosmosConfig from "../cosmos.config.js";

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
  calculate({ wallet, chain }) {
    let findChain = getCosmosConfig.find( ({ name }) => name === chain )
    console.log('findChain', findChain)

    return {
      displayWallet: typeof wallet === "number" ? wallet.toFixed(3) : String(wallet),
      displayChain: String(chain),
      walletAvailable: 'xxx TOKEN'
    };
  }
});
 
