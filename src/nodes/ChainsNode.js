import { defineNode, NodeInterface, TextInterface, NumberInterface } from "baklavajs";
import getCosmosConfig from "../cosmos.config.js";

let finalChains = [];
let finalChainsData = [];

finalChains['display'] = () => new TextInterface("Display", "")
finalChainsData['display'] = ''

for (let i = 0; i < getCosmosConfig.length; i++) {
  finalChains[getCosmosConfig[i].name] = () => new NodeInterface(getCosmosConfig[i].name, "2")
  finalChainsData[getCosmosConfig[i].name] = getCosmosConfig[i].name
}

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

export const DisplayChains = defineNode({
 
  type: "DisplayChains",
  title: "Chains list",
  inputs: {
    value1: () => new NodeInterface("Value", "")                                      
  },
  /* outputs: { 
    value1: () => new NodeInterface("Value", ""),
    value2: () => new NodeInterface("Value2", "") 
  },  */
  outputs: finalChains,
 

  calculate({ value1 }) {
    finalChainsData['display'] = truncate(value1)
    // finalChainsData['display'] = value1
    return finalChainsData 
  }
});
 
 
