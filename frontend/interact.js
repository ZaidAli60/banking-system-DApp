const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TransferSuccessful",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


const web3 = new Web3("http://127.0.0.1:8545");
const contractAddress = "0x0940BB9a9EEBF58721fCE3fC36339615B1a7A601";
const bankContract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById("contractAddress").value = contractAddress;

console.log("bankContract", bankContract)

async function deposit() {
    const amount = document.getElementById("depositAmount").value;
    console.log("amount", amount)
    if (!amount || amount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    const accounts = await web3.eth.getAccounts(); // Get current account
    const fromAccount = accounts[0]; // Use the first account (e.g., from Ganache)
    console.log('fromAccount', fromAccount)
    try {
        await bankContract.methods.deposit().send({
            from: fromAccount,
            value: web3.utils.toWei(amount, 'ether') // Convert ETH to Wei
        });

        alert("Deposit successful!");
        document.getElementById("depositAmount").value = ""
        await getContractBalance(); // Refresh contract balance display
    } catch (error) {
        console.error("Deposit failed", error);
        alert("Deposit failed. See console for details.");
    }
}



async function getContractBalance() {
    const accounts = await web3.eth.getAccounts(); // Get current account
    const fromAccount = accounts[0];
    document.getElementById("yourAddress").value = fromAccount
    console.log('fromAccount', fromAccount)

    const balanceWei = await web3.eth.getBalance(fromAccount); // Balance in Wei
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether'); // Convert to ETH

    document.getElementById("currentBalance").value = balanceEth;
    console.log('Remaining Balance:', balanceEth + ' ETH');

    const balance = await bankContract.methods.getContractBalance().call();
    const ethBalance = web3.utils.fromWei(balance, 'ether');
    console.log("ethBalance", ethBalance)
    document.querySelectorAll("input")[0].value = ethBalance;
}


async function transferEth() {
    const toAddress = document.getElementById("transferTo").value;
    const amountEth = document.getElementById("transferAmount").value;

    if (!web3.utils.isAddress(toAddress)) {
        alert("Invalid address!");
        return;
    }

    if (!amountEth || parseFloat(amountEth) <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];

    try {
        await web3.eth.sendTransaction({
            from: fromAccount,
            to: toAddress,
            value: web3.utils.toWei(amountEth, 'ether')
        });

        alert("Transfer successful!");
        document.getElementById("transferTo").value = "";
        document.getElementById("transferAmount").value= "";
        // Optional: Refresh balances
        await getContractBalance();
        // await updateUserBalance(); // If you have a function like this
    } catch (error) {
        console.error("Transfer failed:", error);
        alert("Transfer failed. See console for details.");
    }
}

async function withdrawEth() {
    const amountEth = document.getElementById("withdrawAmount").value;
  
    if (!amountEth || parseFloat(amountEth) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
  
    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];
  
    try {
      await bankContract.methods.withdraw(web3.utils.toWei(amountEth, 'ether')).send({
        from: fromAccount
      });
  
      alert("Withdrawal successful!");
      document.getElementById("withdrawAmount").value = ""; 
      await getContractBalance();
    //   await getUserBalance(); // Optional: Refresh user's balance
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Withdrawal failed. Check console for details.");
    }
  }
  

window.onload = async () => {
    await getContractBalance();
    // await getUserBalance();
};