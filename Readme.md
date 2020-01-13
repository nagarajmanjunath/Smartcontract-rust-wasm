
# Smar-contract using Rust with wasm

   This repository contains smart contract implementation, which is written using the rust and be compiled to wasm.


# Build prerequisites

 * Install rust

            rustup install nightly-2018-11-12

 * Install wasm


         rustup target add wasm32-unknown-unknown


 * yarn Insatll. Its install the node modules

         yarn install

# Build the rust traget binary

        cargo build

# Complie smart contract to wasm

      ./build.sh

NOTE: Smart contract will get  compiled  and generate the traget folder which consist of json and wasm complied contract. which can be deployed.