import { defineNode, NodeInterface, TextInputInterface, ButtonInterface } from "baklavajs";


export const KeplrLogin = defineNode({
 
  type: "KeplrLogin",
  title: "Connect keplr",
  inputs: {
    Address: () => new ButtonInterface("Connect!", () => console.log("Button clicked"))
  },
  outputs: { 
    value1: () => new NodeInterface("Value", "")  
  },

  calculate({ Address }) { 
    return {
      value1: typeof Address === "number" ? Address.toFixed(3) : String(Address)
    };
  }
});
 
 
