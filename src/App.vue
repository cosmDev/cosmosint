 
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
        >
          {{ link }}
        </v-btn>
        <v-spacer></v-spacer>
 

        <v-btn icon @click="clear">
          <v-icon>mdi-delete-empty</v-icon>
        </v-btn>
      

        <v-btn
          id="menu-activator"
          class="text-none text-subtitle-1"
          color="#000000"
          variant="flat"
        >
          Graph templates
        </v-btn>

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item @click="template1">
          <v-list-item-title>Demo wallet</v-list-item-title>
        </v-list-item>  
        <v-list-item @click="template3">
          <v-list-item-title>Tokens Price</v-list-item-title>
        </v-list-item>          
        <v-list-item @click="template2">
          <v-list-item-title>Chain apr</v-list-item-title>
        </v-list-item>               
      </v-list>
    </v-menu>


    </v-app-bar>

    <v-main>
      <div style="width: 99vw; height: 100vh">

    <baklava-editor :view-model="baklava" />
  </div>
    </v-main>
  </v-app>
 
 

</template>

<script> 
import { defineComponent, ref } from "vue";
import {
  EditorComponent,
  useBaklava,
  DependencyEngine,
  applyResult,
  Components,
} from "baklavajs";
import { BaklavaEvent } from "@baklavajs/events";

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
import { ComboAddress } from "./nodes/combo/ComboAddressNode"; 
import { AprNode } from "./nodes/base/CalculAprNode";
import { PriceNode } from "./nodes/base/TokenPriceNode";


// Cosmos SDK 
import { MintModule } from "./nodes/cosmos-sdk/mint/MintNode"; 
import { StakingModule } from "./nodes/cosmos-sdk/staking/StakingNode"; 
import { BankModule } from "./nodes/cosmos-sdk/bank/BankNode";

import getCosmosConfig from "./cosmos.config.js";

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent
  },
  data: () => ({ 
    drawer: false,
    links: [ 
    ]  
  }),
  setup() { 
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor); 
    //baklava.editor.registerNodeType(ComboAddress, { category: "Combo" });
     
    baklava.editor.registerNodeType(InputNode, { category: "Base" });
    baklava.editor.registerNodeType(OutputNode, { category: "Base" });    
    baklava.editor.registerNodeType(MathNode, { category: "Base" });
    baklava.editor.registerNodeType(AprNode, { category: "Base" });
    baklava.editor.registerNodeType(PriceNode, { category: "Base" });
    
    // baklava.editor.registerNodeType(DisplayNode, { category: "Base" });
    
    baklava.editor.registerNodeType(DisplayChains, { category: "Cosmos hub" });
    baklava.editor.registerNodeType(DisplayChainsSelect, { category: "Cosmos hub" });
    baklava.editor.registerNodeType(AddAddress, { category: "Cosmos connect" });
    baklava.editor.registerNodeType(KeplrLogin, { category: "Cosmos connect" });
    baklava.editor.registerNodeType(WalletNode, { category: "Cosmos connect" });
    baklava.editor.registerNodeType(BankModule, { category: "Cosmos SDK" });  
    baklava.editor.registerNodeType(MintModule, { category: "Cosmos SDK" }); 
    baklava.editor.registerNodeType(StakingModule, { category: "Cosmos SDK" });   
    

    const token = Symbol('token');
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });
   
    /* baklava.editor.nodeEvents.update.subscribe(token, (data, node) => {
        // put your code here
        console.log(node);
    }); */  
    // Add some nodes for demo purposes
    function addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      baklava.displayedGraph.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    }
    const demoWallet = addNodeWithCoordinates(AddAddress, 350, 70); 
    const node2 = addNodeWithCoordinates(DisplayChainsSelect, 650, 150);
    const node3 = addNodeWithCoordinates(WalletNode, 1050, 70);
    const node4 = addNodeWithCoordinates(OutputNode, 1350, 150);
     
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
    return { baklava, engine };
  },
  methods: {
    clear() {
      this.baklava.displayedGraph._connections = []
      this.baklava.displayedGraph._nodes = []
    },
    async template1() { 
      this.clear() 

      const demoWallet = this.addNodeWithCoordinates(AddAddress, 350, 70, this.baklava);
      const node2 = this.addNodeWithCoordinates(DisplayChainsSelect, 650, 150, this.baklava);
      const node3 = this.addNodeWithCoordinates(WalletNode, 1050, 70, this.baklava);
      const node4 = this.addNodeWithCoordinates(OutputNode, 1350, 150, this.baklava); 

      await this.baklava.displayedGraph.addConnection(
        demoWallet.outputs['value1'],
        node2.inputs.input1
      );
      await this.baklava.displayedGraph.addConnection(
        node2.outputs['value2'],
        node3.inputs.wallet
      );      
      await this.baklava.displayedGraph.addConnection(
        node2.outputs['value3'],
        node3.inputs.chain
      );
      await this.baklava.displayedGraph.addConnection(
        node3.outputs['walletAvailable'],
        node4.inputs.value
      );       
    },
    async template2() { 
      this.clear() 
 
      const node2 = this.addNodeWithCoordinates(DisplayChainsSelect, 350, 150, this.baklava);
      const nodeBankModule = this.addNodeWithCoordinates(BankModule, 700, 100, this.baklava);
      const outputBankModule = this.addNodeWithCoordinates(OutputNode, 1050, 100, this.baklava); 

      const nodeStakingModule = this.addNodeWithCoordinates(StakingModule, 700, 530, this.baklava);
      const outputStakingModule = this.addNodeWithCoordinates(OutputNode, 1050, 530, this.baklava);      

      const node3 = this.addNodeWithCoordinates(MintModule, 700, 300, this.baklava);
      const node4 = this.addNodeWithCoordinates(OutputNode, 1050, 300, this.baklava); 

      const aprNode = this.addNodeWithCoordinates(AprNode, 1300, 300, this.baklava);
      const outputAprNode = this.addNodeWithCoordinates(OutputNode, 1600, 300, this.baklava); 

      await this.baklava.displayedGraph.addConnection(
        node2.outputs['value3'],
        nodeBankModule.inputs.getChain
      ); 
      await this.baklava.displayedGraph.addConnection(
        node2.outputs['value3'],
        node3.inputs.getMint
      );   
      await this.baklava.displayedGraph.addConnection(
        node2.outputs['value3'],
        nodeStakingModule.inputs.getChain
      );          
      // Bank edges
      await this.baklava.displayedGraph.addConnection(
        nodeBankModule.outputs['totalSupply'],
        outputBankModule.inputs.value
      );  
      await this.baklava.displayedGraph.addConnection(
        nodeBankModule.outputs['totalSupply'],
        aprNode.inputs.getTotalSupply
      );        
      // Staking edges
      await this.baklava.displayedGraph.addConnection(
        nodeStakingModule.outputs['totalBounded'],
        outputStakingModule.inputs.value
      );  
      await this.baklava.displayedGraph.addConnection(
        nodeStakingModule.outputs['totalBounded'],
        aprNode.inputs.getTotalBounded
      );     
      // Mint edges   
      await this.baklava.displayedGraph.addConnection(
        node3.outputs['value2'],
        aprNode.inputs.getInflation
      );      
      await this.baklava.displayedGraph.addConnection(
        node3.outputs['value2'],
        node4.inputs.value
      ); 
      await this.baklava.displayedGraph.addConnection(
        aprNode.outputs['result'],
        outputAprNode.inputs.value
      );        
      
    },
    async template3() { 
      this.clear() 

      const diplayChains = this.addNodeWithCoordinates(DisplayChainsSelect, 350, 70, this.baklava);
      /* getCosmosConfig.forEach(element => {
        const node = this.addNodeWithCoordinates(PriceNode, 650, 150, this.baklava);    
        this.baklava.displayedGraph.addConnection(
          diplayChains.outputs[element.name],
          node.inputs.getChain
        );            
      });
       */


      const outputDiplayChains = this.addNodeWithCoordinates(PriceNode, 650, 150, this.baklava);  

      
      await this.baklava.displayedGraph.addConnection(
        diplayChains.outputs['value3'],
        outputDiplayChains.inputs.getChain
      );    
    },    
    addNodeWithCoordinates(nodeType, x, y, baklava) {
          const n = new nodeType();
          baklava.displayedGraph.addNode(n);
          n.position.x = x;
          n.position.y = y;
          return n;
    },    
    test() {    
      const foundNode = this.baklava.displayedGraph._nodes.find(
        (element) => element.type === "StakingModule"
      );

      console.log(foundNode);
      //console.log(foundNode.outputs.validators.value);
   

      foundNode.outputs.validators.value.forEach(element => {  
        console.log(element);      
        const testAddNode = this.addNodeWithCoordinates(OutputNode, 1050, 150, this.baklava);
        /* this.baklava.displayedGraph.addConnection(
          node3.outputs['value2'],
          node4.inputs.value
        );  */       
      });


      // const node4 = addNodeWithCoordinates(OutputNode, 1050, 150, this.baklava);
    }     
  }
});
</script>
<style>
/* .baklava-node[data-node-type="DisplayChainsSelect"] { 
    width: 600px !important;
} */

</style>
