var Web3 = require("web3");
var fs = require("fs");
var request = require('request');
var stringify = require('json-stringify-safe');

// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// NOTE: if you run Kovan node there should be an address you've got in the "Option 2: Run Kovan node" step
web3.eth.defaultAccount = "0x004ec07d2329997267ec62b4166639513386f32e";
// read JSON ABI
var abi = JSON.parse(fs.readFileSync("/Users/nagaraj/gowork/src/github.com/Smartcontract-rust-wasm/erc-20/target/json/TokenInterface.json"));
// convert Wasm binary to hex format
var codeHex = '0x' + fs.readFileSync("/Users/nagaraj/gowork/src/github.com/Smartcontract-rust-wasm/erc-20/target/erc20.wasm").toString('hex');
var TokenContract = new web3.eth.Contract(abi, { data: codeHex, from: web3.eth.defaultAccount });
var TokenDeployTransaction = TokenContract.deploy({ data: codeHex, arguments: [10000000] });
var wasm_contract = stringify(TokenDeployTransaction, null, 2)
// console.log("wasm_contract", wasm_contract);

// let options = {
//     url: "http://127.0.0.1:3030",
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({ 'jsonrpc': '2.0', 'method': 'eth_sendTransaction', "params": [wasm_contract], 'id': '1' }),
// };
// request(options, (error, response, body) => {
//     if (error) {
//         console.error('An error has occurred: ', error);
//     } else {
//         console.log('Post successful: response: ', body);
//     }
// });


// web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "user").then(() => TokenDeployTransaction.estimateGas()).then(gas => TokenDeployTransaction.send({ gasLimit: gas, from: web3.eth.defaultAccount })).then(contract => { console.log("Address of new contract: " + contract.options.address); TokenContract = contract; }).catch(err => console.log(err));

//Will create TokenContract with `totalSupply` = 10000000 and print a result
TokenDeployTransaction.send({
    gasLimit: 5000000, from: web3.eth.defaultAccount
}).then(contract => {
    console.log("Address of new contract: " + contract.options.address);
    TokenContract = contract;
}).catch(err => console.log(err));




