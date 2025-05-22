require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // Default RPC URL for Ganache
      // chainId: 1337,               // Default Chain ID for Ganache
      accounts: [
        "0xd46f9d208c9868e182b1326ba1dc3f58d92821fca47548a1cac09d5ba5de9ccb",
        // Add more private keys if needed
      ]
    },
  }
};
