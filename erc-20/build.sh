#!/bin/bash

# cargo +nightly build --release --target wasm32-unknown-unknown

cargo build --release --target wasm32-unknown-unknown
wasm-build --target=wasm32-unknown-unknown ./target erc20
