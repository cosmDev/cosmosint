export default [
  {
    chainId: "cosmoshub-4",
    name: "Atom",
    mode: 'mainnet',
    desc: "The native staking and governance token of the Cosmos Hub.",
    apiURL: "https://rest.cosmos.directory/cosmoshub",
    rpcURL: "https://rpc.cosmos.directory/cosmoshub",
    coinLookup: {
      viewDenom: "ATOM",
      chainDenom: "uatom",
      addressPrefix: "cosmos",
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg`,
    },
    feeMultiplier: 1.5,
    gasPrice: 0.025,
    coingeckoId: "cosmos",
    maxTxSender: 20,
    maxTxRecipient: 20,
    color: '#5A32AC',
    colorChart: ['#39216d', '#5A32AC', '#6e3ed6', '#885af4']
  }, 
  {
    chainId: "bitcanna-dev-1",
    name: "Bitcanna testnet",
    mode: 'testnet',
    desc: "Bitcanna-testnet",
    apiURL: "https://lcd-testnet.bitcanna.io",
    rpcURL: "https://rpc-testnet.bitcanna.io",
    coinLookup: {
      viewDenom: "BCNA",
      chainDenom: "ubcna",
      addressPrefix: "bcna",
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/bitcanna/images/bcna.svg`,
    },
    feeMultiplier: 1.5,
    gasPrice: 0.025,
    coingeckoId: "bitcanna",
    maxTxSender: 20,
    maxTxRecipient: 20,
    color: '#0EA674',
    colorChart: ["#b3ffeb", "#33ffc9", "#00b383", "#004d38"]
  },
  {
    chainId: "quicksilver-2",
    name: "Quicksilver",
    mode: 'mainnet',
    desc: "Quicksilver",
    apiURL: "https://rest.cosmos.directory/quicksilver",
    rpcURL: "https://rpc.quicksilver.zone",
    coinLookup: {
      viewDenom: "QCK",
      chainDenom: "uqck",
      addressPrefix: "quick",
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qck.svg`,
    },
    feeMultiplier: 1.5,
    gasPrice: 0.025,
    coingeckoId: "quicksilver",
    maxTxSender: 20,
    maxTxRecipient: 20,
    color: '#D7D7D7',
    colorChart: ['#f7f7f7', '#D7D7D7', '#898989', '#353535']
  },   
  {
    chainId: 'chihuahua-1',
    name: 'Chihuahua',
    mode: 'mainnet',
    desc: 'Chihuahua is the first interoperable meme coin with a POS blockchain, making it one of the most utilized chains in the Cosmos ecosystem',
    apiURL: 'https://api.chihuahua.wtf',
    rpcURL: 'https://rpc.chihuahua.wtf',
    coinLookup: {
      viewDenom: 'HUAHUA',
      chainDenom: 'uhuahua',
      addressPrefix: 'chihuahua',      
      icon: `https://avatars.githubusercontent.com/u/94940349?v=4`,
    },
    feeMultiplier: 1.5,
    gasPrice: 0.025,
    coingeckoId: "chihuahua-token",
    maxTxSender: 20,
    maxTxRecipient: 20,
    color: '#F0A841',
    colorChart: ["#efc283", "#F0A841", "#c67f21", "#995803"]
  },
  {
    chainId: 'stargaze-1',
    name: 'Stargaze',
    mode: 'mainnet',
    desc: 'Stargaze',
    apiURL: 'https://rest.stargaze-apis.com',
    rpcURL: 'https://rpc.stargaze-apis.com',
    coinLookup: {
      viewDenom: 'STARS',
      chainDenom: 'ustars',
      addressPrefix: 'stars',      
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.svg`,
    },
    feeMultiplier: 1.5,
    gasPrice: 0.025,
    coingeckoId: "stargaze",
    maxTxSender: 20,
    maxTxRecipient: 20,
    color: '#DB2777',
    colorChart: ['#f2bad1', '#DB2777', '#aa1455', '#7c0639']
  }   
];
