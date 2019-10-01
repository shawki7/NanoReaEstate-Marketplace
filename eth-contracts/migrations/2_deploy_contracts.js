var SquareVerifier = artifacts.require("Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const symbol = "CERC721";
const name = "CustomERC721Token";


module.exports = function(deployer, network, accounts) {
  deployer.deploy(SquareVerifier).then(function() {
    deployer.deploy(SolnSquareVerifier, SquareVerifier.address, name, symbol);
  });
};