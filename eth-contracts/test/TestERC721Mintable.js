var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('CustomERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const symbol = "CERC721";
    const name = "CustomERC721Token";

    describe('CHECK spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new(name,symbol,{from: account_one});

          for(let number = 0; number <= 5; number++){
              let action = await this.contract.mint(account_two,number,{from:account_one});
            }
        })

        it('should return total supply', async function () { 
          assert.equal(parseInt(await this.contract.totalSupply()),6,"Incorrect NUM for total supply");
        })

        it('should get token balance', async function () { 
          assert.equal(parseInt( await this.contract.balanceOf(account_two)), 6, "token balance IS FALSE");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
          assert.equal(await this.contract.baseTokenURI(),"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Incorrect uri");
        })

        it('should transfer token', async function () { 
          await this.contract.transferFrom(account_two,account_three,1,{from:account_two});
          let amount = await this.contract.ownerOf(1);
          assert.equal(amount,account_three,"Incorrect token amount");
        })
    });

    describe('ownership props', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new(name,symbol,{from: account_one});
        })

        it('fail if not contract owner', async function () { 
            try{
            let action = await this.contract.mint(account_two,8,{from:account_two});
        }
        catch{
            assert.equal(true, true);
        }
        })

        it('return contract owner', async function () { 
          assert.equal(await this.contract._owner.call(), account_one,"Owner is not correct");
        })

    });
})