import { abi, contractAddress } from './contract.ts';
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

async function main() {
	const privateKey = prompt('Enter your private key: ') as `0x${string}`;
	const implementationAddress = prompt(
		'Enter the contract address: '
	) as `0x${string}`;

	if (!privateKey || !implementationAddress) {
		console.error('Please provide all required inputs.');
		return;
	}

	const eoa = privateKeyToAccount(privateKey);

	const walletClient = createWalletClient({
		account: eoa,
		chain: mainnet,
		transport: http(),
	});

	const authorization = await walletClient.signAuthorization({
		contractAddress,
		executor: 'self',
	});

	await walletClient.writeContract({
		abi,
		address: walletClient.account.address,
		authorizationList: [authorization],
		functionName: 'setImplementation',
		args: [implementationAddress],
	});
}

main()
  .then(() => {
    console.log('Transaction sent successfully.');
  })
  .catch((error) => {
    console.error('Error sending transaction:', error);
  });
