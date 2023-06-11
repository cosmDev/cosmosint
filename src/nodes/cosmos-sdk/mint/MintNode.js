import { defineNode, NodeInterface, TextInterface, ButtonInterface } from "baklavajs";
import axios from 'axios';

import getCosmosConfig from "../../../cosmos.config.js";

export const MintModule = defineNode({
 
  type: "MintModule",
  title: "Mint Module",
  inputs: {
    getMint: () => new NodeInterface("Chain", "")
  },
  outputs: {  
    value2: () => new NodeInterface("Inflation (%)", ""),
    value4: () => new NodeInterface("Annual provisions", "")
  },

  async calculate({ getMint }) {  
    let getInflation = "";
    let getAnnualProvisions = "";
    if (getMint !== "") {  
      let foundChain = getCosmosConfig.find( ({ name }) => name === getMint );   
      getInflation = await axios.get(foundChain.apiURL + '/cosmos/mint/v1beta1/inflation');
      //getInflation = (getInflation.data.inflation * 100).toFixed(2);
      getInflation = Number(getInflation.data.inflation).toFixed(4);

      let provisions = await axios.get(foundChain.apiURL + '/cosmos/mint/v1beta1/annual_provisions');
      getAnnualProvisions = (provisions.data.annual_provisions / 1000000).toFixed(2) + " " + foundChain.coinLookup.viewDenom; 
      
    }
    
    return { 
      value2: getInflation,
      value4: getAnnualProvisions
    };
  }
});
 
 
