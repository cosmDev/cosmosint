import { defineNode, NodeInterface, TextInputInterface, ButtonInterface } from "baklavajs";
export const KeplrLogin = defineNode({
 
  type: "KeplrLogin",
  title: "Connect keplr",
  inputs: {
  },
  outputs: { 
    returnWallet: () => new NodeInterface("Value", "")  
  },

  async calculate() {
    const chainId = "cosmoshub-4";
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts(); 
    return {
      returnWallet: accounts[0].address
    };
  }
});
 
 
