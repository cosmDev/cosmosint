import { defineNode, NodeInterface, TextInterface, ButtonInterface } from "baklavajs";
import axios from 'axios';

import getCosmosConfig from "../../../cosmos.config.js";

export const StakingModule = defineNode({
 
  type: "StakingModule",
  title: "Staking Module",
  inputs: {
    getChain: () => new NodeInterface("Chain", "")
  },
  outputs: {  
    //validators: () => new NodeInterface("Validators", ""),
    totalBounded: () => new NodeInterface("Total Bounded", "") 
  },

  async calculate({ getChain }) {  
    let getValidators = "";
    let getTotalBounded = 0;
    if (getChain !== "") {  
      let foundChain = getCosmosConfig.find( ({ name }) => name === getChain );   
      getValidators = await axios.get(foundChain.apiURL + '/cosmos/staking/v1beta1/validators?pagination.limit=500'); // BOND_STATUS_BONDED
      // getValidators = (getInflation.data.inflation * 100).toFixed(2) + "%";      
      for (let i = 0; i < getValidators.data.validators.length; i++) {
        getTotalBounded += Number(getValidators.data.validators[i].tokens / 1000000)
      }
    }
    
    return { 
      //validators: getValidators.data.validators,
      totalBounded: getTotalBounded
    };
  }
});
 
 
