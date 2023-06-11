import { defineNode, NodeInterface, TextInterface } from "baklavajs";
import axios from 'axios';

import getCosmosConfig from "../../cosmos.config.js";

export const PriceNode = defineNode({
  type: "PriceNode",
  title: "Price Node",
  inputs: {
    getChain: () => new NodeInterface("Chain", "") 
  },
  outputs: {
    valueOut: () => new TextInterface("Display", ""),
    valueOut2: () => new NodeInterface("Price", "")
  },
  async calculate({ getChain }) {
    if (getChain === "") {
      return {
        valueOut: 0,
        valueOut2: 0
      };
    } else {
      let tokenPrice = 0;
      let foundChain = getCosmosConfig.find( ({ name }) => name === getChain );   
      tokenPrice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+ foundChain.coingeckoId +'&vs_currencies=usd'); // BOND_STATUS_BONDED
      // getChain = foundChain.coinLookup.chainDenom;
      return {
        valueOut: '$' + tokenPrice.data[foundChain.coingeckoId].usd.toFixed(2),
        valueOut2: tokenPrice.data[foundChain.coingeckoId].usd.toFixed(2)
      };
    }

  }
});
 
