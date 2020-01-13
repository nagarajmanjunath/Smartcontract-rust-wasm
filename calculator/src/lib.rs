#![no_std]
#![allow(non_snake_case)]
#![feature(proc_macro_hygiene)]

extern crate pwasm_abi;
extern crate pwasm_abi_derive;
extern crate pwasm_ethereum;
extern crate pwasm_std;



pub mod calculator {
    use pwasm_abi::types::*;
    use pwasm_ethereum;

    // eth_abi is a procedural macros https://doc.rust-lang.org/book/first-edition/procedural-macros.html
    use pwasm_abi_derive::eth_abi;

    #[eth_abi(CalculatorEndpoint, CalculatorClient)]
    pub trait CalculatorInterface {
        /// The constructor
        fn constructor(&mut self);
        fn sum(&mut self, a: U256, b: U256) -> U256;
        fn subtract(&mut self, a: U256, b: U256)-> U256;
        fn mul(&mut self, a: U256, b: U256)-> U256;
        fn divide(&mut self, a: U256, b: U256)-> U256;
        fn get_value(&mut self, value: U256) -> U256;
    }

    pub struct CalculatorContract;

    impl CalculatorInterface for CalculatorContract {
        fn constructor(&mut self) {
            // pwasm_ethereum::write(&result_key(), &total_supply.into());
        }

        fn sum(&mut self, a: U256, b: U256)->U256{
            let value_add = a + b;
            let result=value_add;
            pwasm_ethereum::write(&result_key(), &value_add.into());
            result
        }
        fn subtract(&mut self, a: U256, b: U256)->U256 {
            let value_sub = a - b;
            let result = value_sub;
            pwasm_ethereum::write(&result_key(), &value_sub.into());
            result
        }
        fn mul(&mut self, a: U256, b: U256) -> U256 {
            let value_mul = a * b;
             let result = value_mul;
            pwasm_ethereum::write(&result_key(), &value_mul.into());
            result
        }
        fn divide(&mut self, a: U256, b: U256)->U256 {
            let value_divide = a / b;
            let result = value_divide;
            pwasm_ethereum::write(&result_key(), &value_divide.into());
            result
        }

        fn get_value(&mut self, value: U256) -> U256 {
           let result= value;
           result
        }
    }

    fn result_key() -> H256 {
        let key = H256::zero();
        key
    }

    fn value_key(value: U256) -> H256 {
        let va = H256::from(value);
        va
    }
}
// Declares the dispatch and dispatch_ctor methods
use pwasm_abi::eth::EndpointInterface;

#[no_mangle]
pub fn call() {
    let mut endpoint = calculator::CalculatorEndpoint::new(calculator::CalculatorContract {});
    // Read http://solidity.readthedocs.io/en/develop/abi-spec.html#formal-specification-of-the-encoding for details
    pwasm_ethereum::ret(&endpoint.dispatch(&pwasm_ethereum::input()));
}

#[no_mangle]
pub fn deploy() {
    let mut endpoint = calculator::CalculatorEndpoint::new(calculator::CalculatorContract {});
    endpoint.dispatch_ctor(&pwasm_ethereum::input());
}
