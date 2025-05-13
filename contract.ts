export const abi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_newImplementation',
				type: 'address',
			},
		],
		name: 'setImplementation',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		stateMutability: 'payable',
		type: 'fallback',
	},
	{
		stateMutability: 'payable',
		type: 'receive',
	},
	{
		inputs: [],
		name: 'implementation',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];

