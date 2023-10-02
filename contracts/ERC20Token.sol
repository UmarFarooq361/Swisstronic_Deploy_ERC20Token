// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20Token is ERC20 {
    constructor()ERC20("Swisstronik","SWTR"){} 

    function mint50tokens() public {
        _mint(msg.sender,50*10**18);
    }

    function burn50tokens() public{
        _burn(msg.sender,50*10**18);
    }
    
}