var Web3 = require("web3");
var fs = require("fs");

var contract_address = "0xeDFC9c2F4Cfa7495c1A95CfE1cB856F5980D5e18";
var acc = "0x004ec07d2329997267ec62b4166639513386f32e";
// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// NOTE: if you run Kovan node there should be an address you've got in the "Option 2: Run Kovan node" step

var abi = JSON.parse(fs.readFileSync("/Users/nagaraj/gowork/src/github.com/Smartcontract-rust-wasm/erc20/target/json/TokenInterface.json"));

var Contract = new web3.eth.Contract(abi,contract_address);
console.log(Contract)
let gasprice = web3.eth.gasPrice
console.log(Contract);

//sum two numbers
var cal_value;


// Contract.options.from=acc
// web3.eth.personal.unlockAccount(acc, "user").then(() => Contract.methods.transfer("0x00d695cd9b0ff4edc8ce55b493aec495b597e235", 200).send()).then(console.log).catch(console.log);

// Check balance of recipient. Should print 200
// Contract.methods.balanceOf("0x004ec07d2329997267ec62b4166639513386f32e").call().then(console.log).catch(console.log);

// Check balance of recipient. Should print 200
Contract.methods.balanceOf(acc).estimateGas({ from: acc }).then(function (result) {
    console.log("Total-balance",JSON.stringify(result))
    cal_value = result
}).catch(function (error) {
    console.log(error)
});

