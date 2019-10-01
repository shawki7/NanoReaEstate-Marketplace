var solnSquareContract = artifacts.require('SolnSquareVerifier');
var verifierContract = artifacts.require("Verifier");
var proof = require("./proof.json");

contract('Square_verifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const symbol = "CERC721";
    const name = "CustomERC721Token";
    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";



    describe('adding a new solution', function () {
        beforeEach(async function () {
            const verifier = await verifierContract.new({ from: account_one });
            this.contract = await solnSquareContract.new(verifier.address, name, symbol, { from: account_one });
        })

        it('add new solution', async function () {
            let action = await this.contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, { from: account_two });
            assert.equal(action.logs[0].args[1], account_two, "Solution-address doesn't match senders adddress");
        });
    });

    describe('Test ERC721 token if can be minted for contract', function () {
        beforeEach(async function () {
            const verifier = await verifierContract.new({ from: account_one });
            this.contract = await solnSquareContract.new(verifier.address, name, symbol, { from: account_one });
        })

        it('minting ERC721', async function () {

            let action = await this.contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, { from: account_one });
            assert.equal(action.logs[0].args[1], account_one, "it is not the sender adddress");

            await this.contract.mintNewNFT(proof.inputs[0], proof.inputs[1], account_three, { from: account_one });
            
            assert.equal(
             parseInt(await this.contract.balanceOf(account_three)),
             1,
             "the token value is false");

            assert.equal(await this.contract.tokenURI(0, { from: account_one }),
             "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0",
             "the uri value is false");
        });
    });

})