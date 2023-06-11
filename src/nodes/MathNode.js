import {
  defineNode,
  NumberInterface,
  SelectInterface,
  NodeInterface
} from "baklavajs";

export const MathNode = defineNode({
  type: "MathNode",
  title: "Math",
  inputs: {
    operation: () =>
      new SelectInterface("Operation", "Add", ["Add", "Subtract", "Multiply"]).setPort(
        false
      ),
    num1: () => new NumberInterface("Num 1", 1),
    num2: () => new NumberInterface("Num 2", 1)
  },
  outputs: {
    result: () => new NodeInterface("Result")
  },
  calculate({ num1, num2, operation }) {
    if (operation === "Add") {
      return { result: num1 + num2 };
    } else if (operation === "Multiply") {
      return { result: num1 * num2 };
    } else {
      return { result: num1 - num2 };
    }
  }
});
 
