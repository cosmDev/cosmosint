<template>
  <!--
    By default, the editor completely fills its parent HTML element.
    If you directly use the editor in the <body> element, make sure to use
    a wrapper <div> with specified width and height properties:
          -->
  <div style="width: 100vw; height: 100vh">
    <baklava-editor :view-model="baklava" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  EditorComponent,
  useBaklava,
  DependencyEngine,
  applyResult
} from "baklavajs";
import "@baklavajs/themes/dist/classic.css";

// import { DisplayNode } from "./nodes/DisplayNode";
import { MathNode } from "./nodes/MathNode";
import { DisplayChains } from "./nodes/ChainsNode";
import { DisplayChainsSelect } from "./nodes/ChainsSelectNode";
import { AddAddress } from "./nodes/AddAddressNode";
import { KeplrLogin } from "./nodes/KeplrNode";
import { WalletNode } from "./nodes/WalletNode";
import { InputNode } from "./nodes/base/InputNode";
import { OutputNode } from "./nodes/base/OutputNode";
// Cosmos SDK 
import { MintModule } from "./nodes/cosmos-sdk/mint/MintNode"; 

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent
  },
  setup() {
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    baklava.editor.registerNodeType(InputNode, { category: "Base" });
    baklava.editor.registerNodeType(OutputNode, { category: "Base" });
    
    baklava.editor.registerNodeType(MathNode, { category: "Base" });
    // baklava.editor.registerNodeType(DisplayNode, { category: "Base" });
    
    baklava.editor.registerNodeType(DisplayChains, { category: "Cosmos hub" });
    baklava.editor.registerNodeType(DisplayChainsSelect, { category: "Cosmos hub" });
    baklava.editor.registerNodeType(AddAddress, { category: "Cosmos connect" });
    baklava.editor.registerNodeType(KeplrLogin, { category: "Cosmos connect" });
    baklava.editor.registerNodeType(WalletNode, { category: "Cosmos connect" });
    baklava.editor.registerNodeType(MintModule, { category: "Cosmos SDK" });
    
    

    const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });
 
    // Add some nodes for demo purposes
    function addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      baklava.displayedGraph.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    }
    const demoWallet = addNodeWithCoordinates(AddAddress, 350, 70);
    const node2 = addNodeWithCoordinates(DisplayChainsSelect, 650, 500);
    const node3 = addNodeWithCoordinates(WalletNode, 1050, 70);
    const node4 = addNodeWithCoordinates(OutputNode, 1350, 500);
     
    baklava.displayedGraph.addConnection(
      demoWallet.outputs['value1'],
      node2.inputs.input1
    );
    baklava.displayedGraph.addConnection(
      node2.outputs['value2'],
      node3.inputs.wallet
    );    
    baklava.displayedGraph.addConnection(
      node2.outputs['value3'],
      node3.inputs.chain
    );     
    baklava.displayedGraph.addConnection(
      node3.outputs['walletAvailable'],
      node4.inputs.value
    );      
    engine.start();
    return { baklava };
  }
});
</script>
<style>
/* .baklava-node[data-node-type="DisplayChainsSelect"] { 
    width: 600px !important;
} */

</style>
