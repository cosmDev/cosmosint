import { defineNode, NodeInterface, TextInterface } from "baklavajs";

export const OutputNode = defineNode({
  type: "OutputNode",
  title: "OutputNode",
  inputs: {
    value: () => new NodeInterface("Value", "")
  },
  outputs: {
    valueOut: () => new TextInterface("Display", "")
  },
  calculate({ value }) {
    return {
      valueOut: typeof value === "number" ? value.toFixed(3) : String(value)
    };
  }
});
 
