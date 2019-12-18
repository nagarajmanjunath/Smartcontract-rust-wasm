
# Smar-contract using Rust with wasm

  This is the simple get and set contract, which is written using the rust and it will be compiled to wasm.


# Build prerequisites

 * Install rust

            rustup install nightly-2018-11-12

 * Install wasm


         rustup target add wasm32-unknown-unknown


 * yarn Insatll. Its install the node modules

         yarn install


# Complie smart contract to wasm

      ./build.sh

NOTE: Getter smart contract wiil get  compiled  and generate the traget folder which consist of json and wasm complied contract. which can be deployed.