const hre = require("hardhat");

const contractAddress = "0xcEf53F6261879A84b64DA8393faA3d541083B04b";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Get the ContractFactory for the CryptoDevs contract
  const CryptoDevs = await hre.ethers.getContractFactory("CryptoDevs");

  // Deploy the CryptoDevs Contract
  const nftContract = await CryptoDevs.deploy(contractAddress);

  // wait for the contract to deploy
  await nftContract.deployed();

  // print the address of the deployed contract
  console.log("NFT Contract Address:", nftContract.address);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: nftContract.address,
    constructorArguments: [contractAddress],
  });
}
