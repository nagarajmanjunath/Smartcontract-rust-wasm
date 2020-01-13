var Web3 = require("web3");
var fs = require("fs");

var contract_address = "0xEf6c9341e27C23E205f5Da6c3e80F0b38603b1a8";
var acc = "0x004ec07d2329997267ec62b4166639513386f32e";
// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// NOTE: if you run Kovan node there should be an address you've got in the "Option 2: Run Kovan node" step

var abi = JSON.parse(fs.readFileSync("./calculator/target/json/CalculatorInterface.json"));

var Contract = new web3.eth.Contract(abi,contract_address);
console.log(Contract)
let gasprice = web3.eth.gasPrice
console.log(Contract);

//sum two numbers
var cal_value;

Contract.options.from=acc

Contract.methods.sum(255,123).call({from:acc}, function(error, result){
  if (result!=""){
    console.log(result)
  }else{
      console.log(error)
  }
});

