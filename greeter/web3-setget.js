var Web3 = require("./node_modules/web3");
var fs = require("fs");

var contract_address = "0x1ffB8accd6d248f36bD2Fa56821C76b42dEF7B5D";
var acc = "0x004ec07d2329997267ec62b4166639513386f32e";
// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// NOTE: if you run Kovan node there should be an address you've got in the "Option 2: Run Kovan node" step

var abi = JSON.parse(fs.readFileSync("/Users/nagaraj/gowork/src/github.com/Smartcontract-rust-wasm/greeter/target/json/GreeterInterface.json"));

console.log(abi)

var Contract = new web3.eth.Contract(abi,contract_address);
console.log(Contract)
let gasprice = web3.eth.gasPrice
console.log(Contract);



//set methods
Contract.methods.setX(125).call().then(function (result) {
    console.log("set result",JSON.stringify(result))
}).catch(function (error) {
    console.log(error)
});


//get methods
Contract.methods.getX().call({ from: acc }).then(function (result) {
    console.log("get result",JSON.stringify(result))
}).catch(function (error) {
    console.log(error)
});
// const transactionObject = {
//     from: acc,
//     gas: "",
//     gasPrice: gasprice
// };

// Courses.setX(123456, transactionObject, (error, result) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(result);
//     }

//  });