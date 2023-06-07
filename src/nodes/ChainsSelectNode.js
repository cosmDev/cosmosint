import { defineNode, NodeInterface, TextInterface, SelectInterface } from "baklavajs";
import { bech32 } from "bech32";
import getCosmosConfig from "../cosmos.config.js";

let finalChains = [];

getCosmosConfig.forEach(element => {
  finalChains.push({ text: element.name, value: element.name });
});
 
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

export const DisplayChainsSelect = defineNode({
 
  type: "DisplayChainsSelect",
  title: "Chains select",
  inputs: {
    input1: () => new NodeInterface("Wallet", ""),
    input2: () => new SelectInterface("Select chain", 'Atom', finalChains)                   
  },
  outputs: { 
    value1: () => new TextInterface("Display", ""),
    value2: () => new NodeInterface("Wallet", ""),
    value3: () => new NodeInterface("Chain", "") 
  },
  /* outputs: finalChains,  */
 

  calculate({ input1, input2 }) {
    console.log("input1", input1)
    let finalAddress = ""
    let finalAddressTrunc = ""
    if (input1 !== "") {
      let bechDecode = bech32.decode(input1)  
      let convertTo = getCosmosConfig.find( ({ name }) => name === input2 )
  
      console.log("convertTo", convertTo)
      finalAddressTrunc = truncate(bech32.encode(convertTo.coinLookup.addressPrefix, bechDecode.words))  
      finalAddress = bech32.encode(convertTo.coinLookup.addressPrefix, bechDecode.words)    
    }



    return {
      value1: finalAddressTrunc,
      value2: finalAddress,
      value3: input2
    };
  }
});
 
 
