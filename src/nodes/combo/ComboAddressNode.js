import { defineNode, NodeInterface, TextInterface, TextInputInterface, NumberInterface, SelectInterface } from "baklavajs";
import { bech32 } from "bech32";

export const ComboAddress = defineNode({
 
  type: "ComboAddress",
  title: "Combo address",
  inputs: {
    Address: () => new TextInputInterface("Name", "cosmos13jawsn574rf3f0u5rhu7e8n6sayx5gkwjvqrkr") 
  },
  outputs: { 
    value1: () => new NodeInterface("Wallet", "")  
  },

  calculate({ Address }) { 
    /* if (typeof value1 !== "") {
      console.log(bech32.decode(Address))
    } */
    return {
      value1: typeof Address === "number" ? Address.toFixed(3) : String(Address)
    };
  }
});
 
 
