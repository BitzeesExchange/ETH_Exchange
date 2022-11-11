// const {ethers} = require('ethers');
// // const transfer = require('./transfer.json');

// const RPC = 'https://goerli.infura.io/v3/f082831f739b4c0cb9c34dab7da8d3ce'; // Your RPC url here

// const account3 = '0xc69dF16DaB21304Db0F72dF94753255497413129'; // Your public address here
// const privateKey = 'c910faac7ba22f8bde6baebd6ccd8e97c45d2590ba037d69f67e3c1382493e64'; // put your private key here
// const amount = ethers.utils.parseUnits("5", 18)

// const provider = new ethers.providers.JsonRpcProvider(
//     RPC
// )

// const wallet = new ethers.Wallet(privateKey, provider); // Generate wallet


// const contractAddress = '0x710FE347b00F05aC496d1C45Ac256fF1087855Fa';
// const ABI = [
//     "function balanceOf(address) view returns (uint)",
//     "function transfer(address to, uint amount) returns (bool)",
// ];

// async function call() {
//     const contract = new ethers.Contract(
//         contractAddress,
//         ABI,
//         wallet // when we are doing transaction then that time we have to give signer
//     )


// 	//Reciever Balance  before Transactions
//     const recieverBal = await contract.balanceOf(account3);
//     console.log(`${account3} :${await recieverBal.toString()}`);

// 	//Sender Balance before transactions
//      const senderBal = await contract.balanceOf(await wallet.getAddress());
//     console.log(`${await wallet.getAddress()} :${await senderBal.toString()}`)

// //			Send SHIBA INU Token
//     const tx = await contract.transfer(account3, amount)

//   //Wait for transactions to be mined
//    let tx_wait = await tx.wait();

//    	//Reciever Balance  after Transactions
//    const recieverBal2 = await contract.balanceOf(account3);
//    console.log(`${account3} :${await recieverBal2.toString()}`);

//    	//Sender Balance after transactions
//    const senderBal2 = await contract.balanceOf(await wallet.getAddress());
//    console.log(`${await wallet.getAddress()} :${await senderBal2.toString()}`)

//    //For showing all transaction through events
// //    const transferEvents = await contract.queryFilter('Transfer')
// // 		console.log(transferEvents);
//     // transactions.map((item) =>{
//     //     console.log(item.args.from, "," ,item.args.to, ":", ethers.utils.formatEther(item.args.value));
//     // })

//     console.log(tx_wait);
// }

// call();