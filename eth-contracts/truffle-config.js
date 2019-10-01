var HDWalletProvider = require("truffle-hdwallet-provider");
var Mnemonic = "vanish buddy actress swing horse essay silver crash team order muscle kind"

module.exports = {

  networks: {
     development: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "*",       
     },
      rinkeby: {
      provider: function() { 
       return new HDWalletProvider(Mnemonic,"https://rinkeby.infura.io/v3/12a3d332413a42b09da2ee84fde2300d");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }

    
  },

  mocha: {
  },

  compilers: {
    solc: {
    }
  }
}
