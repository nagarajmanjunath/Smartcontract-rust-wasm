#![no_std]
#![allow(non_snake_case)]
#![feature(proc_macro_hygiene)]

extern crate pwasm_std;
extern crate pwasm_ethereum;
extern crate pwasm_abi;
extern crate pwasm_abi_derive;

pub mod greeter {
    use pwasm_ethereum;
    use pwasm_abi::types::*;

    // eth_abi is a procedural macros https://doc.rust-lang.org/book/first-edition/procedural-macros.html
    use pwasm_abi_derive::eth_abi;


    #[eth_abi(GreeterEndpoint, GreeterClient)]
    pub trait GreeterInterface {
        /// The constructor
        fn constructor(& mut self);
        /// Total amount of greeters
        #[constant]
        fn setX(&mut self, x : U256) ;
        /// What is the balance of a particular account?
        #[constant]
        fn getX(& mut self) -> U256;

    }

    pub struct GreeterContract;

    impl GreeterInterface for GreeterContract {
        fn constructor(& mut self) {

        }

        fn setX(&mut self, x : U256) {
            pwasm_ethereum::write(&result_key(), &x.into());
        }

        fn getX(& mut self) -> U256 {
            U256::from_big_endian(&pwasm_ethereum::read(&result_key()))
        }

    }


    fn result_key() -> H256 {
        let  key = H256::zero();
        key
    }
}
// Declares the dispatch and dispatch_ctor methods
use pwasm_abi::eth::EndpointInterface;

#[no_mangle]
pub fn call() {
    let mut endpoint = greeter::GreeterEndpoint::new(greeter::GreeterContract{});
    // Read http://solidity.readthedocs.io/en/develop/abi-spec.html#formal-specification-of-the-encoding for details
    pwasm_ethereum::ret(&endpoint.dispatch(&pwasm_ethereum::input()));
}

#[no_mangle]
pub fn deploy() {
    let mut endpoint = greeter::GreeterEndpoint::new(greeter::GreeterContract{});
    endpoint.dispatch_ctor(&pwasm_ethereum::input());
}