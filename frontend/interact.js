// const contractABI = [
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "TransferSuccessful",
//         "type": "event"
//     },
//     {
//         "inputs": [],
//         "name": "deposit",
//         "outputs": [],
//         "stateMutability": "payable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getBalance",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getContractBalance",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "user",
//                 "type": "address"
//             }
//         ],
//         "name": "getUserBalance",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address payable",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "withdraw",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ]


// const web3 = new Web3("http://127.0.0.1:8545");
// const contractAddress = "0x860961C26755F1326fFdE616a71fdd74CF70f3F2";
// const bankContract = new web3.eth.Contract(contractABI, contractAddress);

// document.getElementById("contractAddress").value = contractAddress;

// console.log("bankContract", bankContract)


// async function connectWallet() {
//     if (window.ethereum) {
//         try {
//             // Request wallet connection
//             const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//             const userAccount = accounts[0];
//             console.log("Connected account:", userAccount);
//             document.getElementById("walletAddress").textContent = userAccount;

//             // Use MetaMask provider instead of hardcoded HTTP
//             const web3 = new Web3(window.ethereum);

//             const contractAddress = userAccount;
//             const bankContract = new web3.eth.Contract(contractABI, contractAddress);

//             console.log("bankContract", bankContract);

//         } catch (error) {
//             console.error("User denied MetaMask connection", error);
//         }
//     } else {
//         alert("MetaMask not found. Please install it.");
//     }
// }


// async function deposit() {
//     const amount = document.getElementById("depositAmount").value;
//     console.log("amount", amount)
//     if (!amount || amount <= 0) {
//         alert("Please enter a valid deposit amount.");
//         return;
//     }

//     const accounts = await web3.eth.getAccounts(); // Get current account
//     const fromAccount = accounts[0]; // Use the first account (e.g., from Ganache)
//     console.log('fromAccount', fromAccount)
//     try {
//         await bankContract.methods.deposit().send({
//             from: fromAccount,
//             value: web3.utils.toWei(amount, 'ether') // Convert ETH to Wei
//         });

//         alert("Deposit successful!");
//         document.getElementById("depositAmount").value = ""
//         await getContractBalance(); // Refresh contract balance display
//     } catch (error) {
//         console.error("Deposit failed", error);
//         alert("Deposit failed. See console for details.");
//     }
// }



// async function getContractBalance() {
//     const accounts = await web3.eth.getAccounts(); // Get current account
//     const fromAccount = accounts[0];
//     document.getElementById("yourAddress").value = fromAccount
//     console.log('fromAccount', fromAccount)

//     const balanceWei = await web3.eth.getBalance(fromAccount); // Balance in Wei
//     const balanceEth = web3.utils.fromWei(balanceWei, 'ether'); // Convert to ETH

//     document.getElementById("currentBalance").value = balanceEth;
//     console.log('Remaining Balance:', balanceEth + ' ETH');

//     const balance = await bankContract.methods.getContractBalance().call();
//     const ethBalance = web3.utils.fromWei(balance, 'ether');
//     console.log("ethBalance", ethBalance)
//     document.querySelectorAll("input")[0].value = ethBalance;
// }


// async function transferEth() {
//     const toAddress = document.getElementById("transferTo").value;
//     const amountEth = document.getElementById("transferAmount").value;

//     if (!web3.utils.isAddress(toAddress)) {
//         alert("Invalid address!");
//         return;
//     }

//     if (!amountEth || parseFloat(amountEth) <= 0) {
//         alert("Please enter a valid amount.");
//         return;
//     }

//     const accounts = await web3.eth.getAccounts();
//     const fromAccount = accounts[0];

//     try {
//         await web3.eth.sendTransaction({
//             from: fromAccount,
//             to: toAddress,
//             value: web3.utils.toWei(amountEth, 'ether')
//         });

//         alert("Transfer successful!");
//         document.getElementById("transferTo").value = "";
//         document.getElementById("transferAmount").value = "";
//         // Optional: Refresh balances
//         await getContractBalance();
//         // await updateUserBalance(); // If you have a function like this
//     } catch (error) {
//         console.error("Transfer failed:", error);
//         alert("Transfer failed. See console for details.");
//     }
// }

// async function withdrawEth() {
//     const amountEth = document.getElementById("withdrawAmount").value;

//     if (!amountEth || parseFloat(amountEth) <= 0) {
//         alert("Please enter a valid amount.");
//         return;
//     }

//     const accounts = await web3.eth.getAccounts();
//     const fromAccount = accounts[0];

//     try {
//         await bankContract.methods.withdraw(web3.utils.toWei(amountEth, 'ether')).send({
//             from: fromAccount
//         });

//         alert("Withdrawal successful!");
//         document.getElementById("withdrawAmount").value = "";
//         await getContractBalance();
//         //   await getUserBalance(); // Optional: Refresh user's balance
//     } catch (error) {
//         console.error("Withdrawal failed:", error);
//         alert("Withdrawal failed. Check console for details.");
//     }
// }

// async function getAllTransactions(account) {
//     const latestBlock = await web3.eth.getBlockNumber();
//     const transactions = [];

//     for (let i = 0; i <= latestBlock; i++) {
//         const block = await web3.eth.getBlock(i, true);
//         if (block && block.transactions) {
//             block.transactions.forEach(tx => {
//                 if (tx.from === account || tx.to === account) {
//                     transactions.push({
//                         hash: tx.hash,
//                         from: tx.from,
//                         to: tx.to,
//                         value: web3.utils.fromWei(tx.value, 'ether'),
//                         blockNumber: tx.blockNumber
//                     });
//                 }
//             });
//         }
//     }

//     return transactions;
// }


// async function showTransactions() {
//     const accounts = await web3.eth.getAccounts();
//     const account = accounts[0];
//     const txs = await getAllTransactions(account);

//     const tbody = document.querySelector("#txTable tbody");
//     tbody.innerHTML = ""; // clear old rows

//     txs.forEach((tx, index) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${tx.hash.slice(0, 10)}...</td>
//         <td>${tx.from}</td>
//         <td>${tx.to}</td>
//         <td>${tx.value}</td>
//         <td>${tx.blockNumber}</td>
//       `;
//         tbody.appendChild(row);
//     });
// }

// window.onload = async () => {
//     await getContractBalance();
//     await showTransactions();
// };



// window.onload = async () => {
//     await getContractBalance();
//     // await getUserBalance();
// };



















// interact.js

let web3;
let bankContract;
let userAccount;
console.log('userAccount', userAccount)
// Replace with your actual contract ABI
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


// Replace with your actual contract address
const contractAddress = "0x860961C26755F1326fFdE616a71fdd74CF70f3F2";

// Connect wallet and initialize contract
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            document.getElementById("walletAddress").textContent = userAccount;
            document.getElementById("contractAddress").value = contractAddress;

            web3 = new Web3(window.ethereum);
            bankContract = new web3.eth.Contract(contractABI, contractAddress);

            console.log("Connected wallet:", userAccount);
            console.log("Bank contract:", bankContract);

            await getContractBalance();
            await showTransactions();

        } catch (error) {
            console.error("MetaMask connection failed", error);
            alert("MetaMask connection failed.");
        }
    } else {
        alert("Please install MetaMask to use this app.");
    }
}

async function deposit() {
    if (!web3 || !userAccount || !bankContract) {
        alert("Please connect your wallet first.");
        return;
    }

    const amount = document.getElementById("depositAmount").value;
    if (!amount || amount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    try {
        await bankContract.methods.deposit().send({
            from: userAccount,
            value: web3.utils.toWei(amount, 'ether')
        });

        alert("Deposit successful!");
        document.getElementById("depositAmount").value = "";
        await getContractBalance();

    } catch (error) {
        console.error("Deposit failed", error);
        alert("Deposit failed. Check console.");
    }
}

async function withdrawEth() {
    if (!web3 || !userAccount || !bankContract) {
        alert("Please connect your wallet first.");
        return;
    }

    const amountEth = document.getElementById("withdrawAmount").value;
    if (!amountEth || parseFloat(amountEth) <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    try {
        await bankContract.methods.withdraw(web3.utils.toWei(amountEth, 'ether')).send({
            from: userAccount
        });

        alert("Withdrawal successful!");
        document.getElementById("withdrawAmount").value = "";
        await getContractBalance();

    } catch (error) {
        console.error("Withdrawal failed", error);
        alert("Withdrawal failed. Check console.");
    }
}

async function transferEth() {
    if (!web3 || !userAccount) {
        alert("Please connect your wallet first.");
        return;
    }

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

    try {
        await web3.eth.sendTransaction({
            from: userAccount,
            to: toAddress,
            value: web3.utils.toWei(amountEth, 'ether')
        });

        alert("Transfer successful!");
        document.getElementById("transferTo").value = "";
        document.getElementById("transferAmount").value = "";
        await getContractBalance();

    } catch (error) {
        console.error("Transfer failed:", error);
        alert("Transfer failed. See console.");
    }
}

async function getContractBalance() {
    if (!web3 || !userAccount || !bankContract) return;

    const balanceWei = await web3.eth.getBalance(userAccount);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
    document.getElementById("yourAddress").value = userAccount;
    document.getElementById("currentBalance").value = balanceEth;

    try {
        const contractBalance = await bankContract.methods.getContractBalance().call();
        const contractEth = web3.utils.fromWei(contractBalance, 'ether');
        document.querySelectorAll("input")[0].value = contractEth;
        console.log("Contract balance:", contractEth);
    } catch (err) {
        console.error("Error fetching contract balance:", err);
    }
}

async function getAllTransactions(account) {
    const latestBlock = await web3.eth.getBlockNumber();
    const transactions = [];

    for (let i = 0; i <= latestBlock; i++) {
        const block = await web3.eth.getBlock(i, true);
        if (block && block.transactions) {
            block.transactions.forEach(tx => {
                if (tx.from === account || tx.to === account) {
                    transactions.push({
                        hash: tx.hash,
                        from: tx.from,
                        to: tx.to,
                        value: web3.utils.fromWei(tx.value, 'ether'),
                        blockNumber: tx.blockNumber
                    });
                }
            });
        }
    }

    return transactions;
}

async function showTransactions() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const txs = await getAllTransactions(account);

    const tbody = document.querySelector("#txTable tbody");
    tbody.innerHTML = ""; // clear old rows

    txs.forEach((tx, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${tx.hash.slice(0, 10)}...</td>
        <td>${tx.from}</td>
        <td>${tx.to}</td>
        <td>${tx.value}</td>
        <td>${tx.blockNumber}</td>
      `;
        tbody.appendChild(row);
    });
}
