# KaiaNodit SDK Typescript

A TypeScript SDK for interacting with the Kaia blockchain through the Nodit Web3 API. This SDK provides comprehensive access to Kaia chain data, including NFTs, tokens, blockchain operations, and statistics.

## Installation

```bash
npm install kaianodit-ts
```

## Quick Start

```typescript
import KaiaNodit from 'kaianodit-ts';

// Initialize the client with Kaia chain
const client = new KaiaNodit('YOUR_API_KEY');

// Start making requests to Kaia chain
const main = async () => {
    // Get NFT metadata for a Kaia NFT contract
    const nftMetadata = await client.nft.getNftMetadataByContract('0x...');
    
    // Get Kaia token balances for an account
    const tokenBalances = await client.token.getTokensOwnedByAccount('0x...');
};
```

## Features

- **Kaia NFT Operations**
  - Kaia NFT contract metadata retrieval
  - NFT ownership tracking on Kaia chain
  - Kaia NFT transfer history
  - Metadata search for Kaia NFTs
  - Holder analytics for Kaia NFTs

- **Kaia Token Operations**
  - Native KAIA token balance checking
  - Kaia token price tracking
  - Token transfer history on Kaia chain
  - Token allowance management
  - Token holder analytics

- **Kaia Blockchain Operations**
  - Kaia block data retrieval
  - Transaction tracking on Kaia chain
  - Kaia gas price monitoring
  - Smart contract detection
  - Kaia chain event searching

- **Kaia Statistics**
  - Account analytics on Kaia chain

## Services

### NFT Service

```typescript
// Get NFT metadata for multiple Kaia NFT contracts
const metadata = await client.nft.getNftContractMetadataByContracts(['0x...', '0x...']);

// Get Kaia NFTs owned by an account
const nfts = await client.nft.getNftsOwnedByAccount('0x...', {
    withMetadata: true,
    limit: 10,
    offset: 0
});
```

### Token Service

```typescript
// Get native KAIA balance
const balance = await client.token.getNativeBalanceByAccount('0x...');

// Check Kaia token allowance
const allowance = await client.token.getTokenAllowance(
    '0x...', // contract address
    '0x...', // owner address
    '0x...'  // spender address
);
```

### Blockchain Service

```typescript
// Get Kaia block information
const block = await client.blockchain.getBlockByHashOrNumber('latest');

// Search for specific events on Kaia chain
const events = await client.blockchain.searchEvents(
    '0x...', // contract address
    ['Transfer'], // event names
    abi, // contract ABI
    { limit: 100 }
);
```

### Statistics Service

```typescript
// Get account statistics on Kaia chain
const stats = await client.statistics.getAccountStats('0x...');
```

## Pagination and Parameters

Most methods support pagination and additional parameters for querying Kaia chain data:

```typescript
const params = {
    limit: 10,
    offset: 0,
    fromDate: '2024-01-01',
    toDate: '2024-12-31',
    fromBlock: '0',
    toBlock: 'latest'
};
```

## Support

For Kaia chain API access and documentation, visit [https://developer.nodit.io/](https://developer.nodit.io/reference/design)
