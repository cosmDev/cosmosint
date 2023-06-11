import { defineNode, NodeInterface, DependencyEngine, useBaklava, applyResult } from "baklavajs";


export const InputNode = defineNode({
  type: "InputNode",
  title: "InputNode",
  inputs: {    
  },
  outputs: {
    value: () => new NodeInterface("Value", "")
  },
  calculate({ value }) {


 
    return {
      value: typeof value === "number" ? value.toFixed(3) : String(value)
    };
  }
});
 
