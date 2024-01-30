// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address private _owner;
    uint private _tokenPrice;

    mapping(address=>uint) private _usersRedeemed;

    modifier onlyOwner {
        require(msg.sender == _owner, "CREDITS: only owner function");
        _;
    }
    
    constructor(string memory _name, string memory _symbol, uint tp) ERC20(_name, _symbol){
        _owner = msg.sender;
        _tokenPrice = tp;
        _mint(msg.sender, 100000);
    }

    function mintTokens(uint numOfTokens) public payable {
       

        _mint(msg.sender, numOfTokens);

    }

    // getter functions
    function owner() public view returns(address){
        return _owner;
    }
    function tokenPrice() public view returns(uint){
        return _tokenPrice;
    }

    function getContractBalance()public view onlyOwner returns(uint){
        return address(this).balance;
    }

    function usersRedeemed(address user) public view returns(uint) {
        return _usersRedeemed[user];
    }
}