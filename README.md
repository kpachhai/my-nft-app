# My Nft App

- Contract Address: 0xd09e76d0391ca8442912abb6ac82e559679bf1a3
- Contract Url: [https://goerli.etherscan.io/address/0xd09e76d0391ca8442912abb6ac82e559679bf1a3](https://goerli.etherscan.io/address/0xd09e76d0391ca8442912abb6ac82e559679bf1a3)
- Website Url: [https://my-nft-app-eta.vercel.app](https://my-nft-app-eta.vercel.app)

## Run Locally

First, copy the environment file

```bash
cp .env.example .env
```

and put your own values to the environment variables. Note that you only need to put your own values for NEXT_PUBLIC_ENABLE_TESTNETS and NEXT_PUBLIC_WALLETCONNECT_PROJECTID to run the app. The rest of the variables are for deploying the contract locally/goerli.

Then, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start minting NFTs.

## Deploy MyNFT smart contract locally/goerli

Deploy the contract to hardhat running locally

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Deploy the contract to Goerli testnet

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Note that the deploy script automatically verifies the contract code on Etherscan if you have passed in ETHERSCAN_API_KEY on ur .env file.
