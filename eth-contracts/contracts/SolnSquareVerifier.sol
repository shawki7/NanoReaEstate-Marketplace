pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

contract SolnSquareVerifier is CustomERC721Token {
  Verifier private verifierContract;


  constructor(
   address verifierAddress,
   string memory name,
   string memory symbol)
   CustomERC721Token(name, symbol)
    public
  {
      verifierContract = Verifier(verifierAddress);
  }

  struct Solution {
    uint256 solutionIndex;
    address solutionAddress;
    bool solutionExists;
    bool minted;
  }

  uint256 public soultionsNum = 0;

  mapping(bytes32 => Solution) public solutions;

  event SolutionAdded(uint256 _index, address indexed _address);

  function addSolution(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
    )
      public
  {
      bytes32 solutionHash = keccak256(abi.encodePacked(input[0], input[1]));
      
      require(solutions[solutionHash].solutionExists == false, "Solution is already exists");
      require(verifierContract.verifyTx(a,b,c, input), "Solution could not be verified");

      solutions[solutionHash] = Solution(soultionsNum,msg.sender,true,false);

      soultionsNum+=1;

      emit SolutionAdded(soultionsNum, msg.sender);
  }


    function mintNewNFT(uint a, uint b, address to) public
  {
      bytes32 solutionHash = keccak256(abi.encodePacked(a, b));

      require(solutions[solutionHash].solutionExists == true, "Solution does not exist");
      require(solutions[solutionHash].minted == false, "it's already minted");
      require(solutions[solutionHash].solutionAddress == msg.sender, "Only solution address can use it to mint a token");
      super.mint(to, solutions[solutionHash].solutionIndex);
      solutions[solutionHash].minted = true;
  }


}


contract Verifier {
    function verifyTx(
      uint[2] memory a,
      uint[2][2] memory b,
      uint[2] memory c,
      uint[2] memory input
    )
    public
    returns
    (bool r);
}