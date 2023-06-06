import { defineNode, NodeInterface, TextInterface, ButtonInterface } from "baklavajs";
import axios from 'axios';

import getCosmosConfig from "../../../cosmos.config.js";

export const MintModule = defineNode({
 
  type: "MintModule",
  title: "Mint Module",
  inputs: {
    getMint: () => new NodeInterface("Value", "")
  },
  outputs: { 
    value1: () => new TextInterface("Name", ""),
    value2: () => new TextInterface("Value", "")
  },

  async calculate({ getMint }) { 
    console.log("getMint", getMint);
    let getInflation = "";
    if (getMint !== "") {  
      let foundChain = getCosmosConfig.find( ({ name }) => name === getMint );   
      getInflation = await axios.get(foundChain.apiURL + '/cosmos/mint/v1beta1/inflation');
      getInflation = (getInflation.data.inflation * 100).toFixed(2) + "%";
    }
    
    return {
      value1: String(getMint) + ' inflation',
      value2: getInflation
    };
  }
});
 
 
