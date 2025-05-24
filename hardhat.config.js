require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // Default RPC URL for Ganache
      // chainId: 1337,               // Default Chain ID for Ganache
      accounts: [
        "0xfdfcf067c3d75b620aa3fa39b718e3b9c8503260ae3eeed3a72bd57545a41307",
        // Add more private keys if needed
      ]
    },
  }
};
