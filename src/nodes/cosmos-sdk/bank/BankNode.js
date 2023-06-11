import { defineNode, NodeInterface, TextInterface, ButtonInterface } from "baklavajs";
import axios from 'axios';

import getCosmosConfig from "../../../cosmos.config.js";

export const BankModule = defineNode({
 
  type: "BankModule",
  title: "Bank Module",
  inputs: {
    getChain: () => new NodeInterface("Chain", "")
  },
  outputs: {   
    totalSupply: () => new NodeInterface("Total Supply", "") 
  },

  async calculate({ getChain }) {  
    let totalSupply = "";
    let getTotalBounded = 0;
    let foundToken = "";
    if (getChain !== "") {  
      let foundChain = getCosmosConfig.find( ({ name }) => name === getChain );   
      totalSupply = await axios(
        foundChain.apiURL + "/cosmos/bank/v1beta1/supply?pagination.limit=5000" 
      ); 
      
      foundToken = totalSupply.data.supply.find( ({ denom }) => denom === foundChain.coinLookup.chainDenom ); 
      foundToken = foundToken.amount / 1000000;
      console.log(foundToken.amount);
    }
    
    return {  
      totalSupply: foundToken
    };
  }
});
 
 
