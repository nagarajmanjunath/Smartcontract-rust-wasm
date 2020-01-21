var Web3 = require("web3");
var fs = require("fs");
// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// NOTE: if you run Kovan node there should be an address you've got in the "Option 2: Run Kovan node" step
web3.eth.defaultAccount = "0x004ec07d2329997267ec62b4166639513386f32e";
// read JSON ABI
var abi = JSON.parse(fs.readFileSync("./calculator/target/json/CalculatorInterface.json"));
// convert Wasm binary to hex format
var codeHex = '0x' + fs.readFileSync("./calculator/target/calculator.wasm").toString('hex');
console.log("code_hex",codeHex);
var TokenContract = new web3.eth.Contract(abi, { data: codeHex, from: web3.eth.defaultAccount });
var TokenDeployTransaction = TokenContract.deploy({ data: codeHex});
// Will create TokenContract with `totalSupply` = 10000000 and print a result
web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "user").then(() => TokenDeployTransaction.estimateGas()).then(gas => TokenDeployTransaction.send(
    { gasLimit: 6000000, from: web3.eth.defaultAccount })).then(contract => {
      console.log("Address of new contract: " + contract.options.address);
      TokenContract = contract; }).catch(err => console.log(err));





