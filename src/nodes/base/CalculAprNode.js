import {
  defineNode,
  NumberInterface,
  SelectInterface,
  NodeInterface
} from "baklavajs";

export const AprNode = defineNode({
  type: "AprNode",
  title: "Apr Node",
  inputs: {
    getTotalSupply: () => new NodeInterface("Total Supply", ""),
    getInflation: () => new NodeInterface("Total Inflation", ""),
    getTotalBounded: () => new NodeInterface("Total Bounded", "")
  },
  outputs: {
    result: () => new NodeInterface("Result")
  },
  calculate({ getTotalSupply, getInflation, getTotalBounded }) {
    if (getTotalSupply !== "" && getInflation !== "" && getTotalBounded !== "") {

       let finalApr = (
        ((getTotalSupply * getInflation) / getTotalBounded) *
        100
      ).toFixed(1); 
      /* let finalTotalSupply = getTotalSupply;
      let finalTotalBounded = getTotalBounded;
      let finalInflation = getInflation;


      console.log(finalTotalSupply);
      console.log(finalTotalBounded);
      console.log(finalInflation);


      let finalApr = (
        ((finalTotalSupply * finalTotalBounded) / finalInflation)
      ).toFixed(1); */

      return { result: finalApr + '%' };
    } else {
      return { result: 0 };
    }
  }
});
 
