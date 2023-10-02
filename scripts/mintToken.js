const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link 
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // deployed contract address
  const contractAddress = "0x5ae1b3369028F6e24208edC34b0fde03938E630D";

  // Get the signer
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("Erc20Token");
  const contract = contractFactory.attach(contractAddress);

  // Send a shielded transaction to mint 50 tokens in the contract
  const functionName = "mint50tokens";
  const mint50TokensTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName), 0);

  await mint50TokensTx.wait();

  console.log("Transaction Receipt: ", mint50TokensTx);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});