require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", 
      // accounts: [process.env.PRIVATE_KEY], 
      accounts: [`0x${process.env.PRIVATE_KEY}`], 
      
    },
  },
};
