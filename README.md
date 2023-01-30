# NFT Image Locator
Find the location of an image in an NFT collection following the ERC-721 standard.

## Usage
```
git clone https://github.com/EridianAlpha/nft-image-locator
cd nft-image-locator
yarn
ts-node findNftUri.ts
```

## Requirements
1. NFT Contract Address
2. NFT ID

### .env format:
```
RPC_ADDRESS_MAINNET=https://...
RPC_USER_MAINNET=<USERNAME>
RPC_PASSWORD_MAINNET=<PASSWORD>
RPC_ADDRESS_GOERLI=https://...
RPC_ADDRESS_GNOSIS=https://rpc.gnosischain.com
```
**Note:** The RPC_USER_MAINNET and RPC_PASSWORD_MAINNET are optional.