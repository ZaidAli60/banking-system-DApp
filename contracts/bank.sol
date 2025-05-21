// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Bank {
    mapping(address => uint256) private balances;

    event TransferSuccessful(address from, address to, uint256 amount);

    // Deposit function: Payable to receive ETH
    function deposit() public payable {
        require(msg.value > 0, "Send some ETH to deposit");
        balances[msg.sender] += msg.value;
    }

    // Withdraw function
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // Check balance function
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Get contract balance (for display in frontend)
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Transfer to another address
    function transfer(address payable to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Cannot transfer to zero address");

        balances[msg.sender] -= amount;
        balances[to] += amount;
        to.transfer(amount);  // Transfer the ether
        emit TransferSuccessful(msg.sender, to, amount);

    }

    // Get user balance by address (optional)
    function getUserBalance(address user) public view returns (uint256) {
        return balances[user];
    }
}
