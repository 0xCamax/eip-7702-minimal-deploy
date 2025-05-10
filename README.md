# Pectra Script

This script is for interacting with a smart contract on the Ethereum mainnet. It allows users to set the implementation address of a contract by signing and sending a transaction.

## Prerequisites

Before using this script, ensure you have the following:

1. **Deno** installed on your system.
2. **TypeScript** installed globally or locally in your project.
3. A valid **private key** for an Ethereum account.
4. The **contract address** for the target smart contract.
5. **IMPORTANT** to have already deployed the implementation contract that you want.

**NOTE** this script delegates to a proxy contract that implements the address that you provide.
