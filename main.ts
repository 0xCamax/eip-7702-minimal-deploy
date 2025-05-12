import { abi } from './contract.ts';
import { createWalletClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const contractAddressMainnet = '0x3cf77F1aaF5E07E3422199FECFF11602c47BcF7A';
const contractAddressSepolia = '0x3f56469c5235cD699f767776B45801Ce70b0B89C';

async function main() {
	const privateKey = prompt('Enter your private key: ') as `0x${string}`;
	const chain = prompt('Enter the chain(mainnet/sepolia): ');
	let chainId;
	if (!chain || (chain !== "mainnet" && chain !== "sepolia")) {
		console.error('Options are mainnet or sepolia');
		return;
	} else if (chain === "mainnet") {
		chainId = mainnet;
	} else if (chain === "sepolia") {
		chainId = sepolia;
	}
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
		chain: chainId,
		transport: http(),
	});

	const authorization = await walletClient.signAuthorization({
		contractAddress: (chainId == mainnet) ? contractAddressMainnet : contractAddressSepolia,
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
