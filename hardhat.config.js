require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // Default RPC URL for Ganache
      // chainId: 1337,               // Default Chain ID for Ganache
      accounts: [
        "0x56e69b31289c2b1e21035dc9e196ef0edc864e8b8cc3bc050bc1a06cf003a049",
        // Add more private keys if needed
      ]
    },
  }
};
