import { ethers, network as n, run } from 'hardhat'

async function main(): Promise<void> {
  const [defaultOwner] = await ethers.getSigners()

  // Specify the owner address for the Goerli testnet
  const goerliOwnerAddress = process.env.CONTRACT_OWNER || defaultOwner.address

  // Determine the network
  const network = n.name

  // Set the owner address based on the network
  let ownerAddress = ''
  if (network === 'goerli') {
    ownerAddress = goerliOwnerAddress
  } else {
    ownerAddress = defaultOwner.address
  }

  // Create a contract factory
  const MyNFT = await ethers.getContractFactory('MyNFT')

  const args = [ownerAddress]
  console.log(`Deploying contract with '${ownerAddress} as the owner`)
  // Deploy the contract
  const myNFT = await MyNFT.deploy(ownerAddress)
  // Wait for the contract to be deployed
  await myNFT.waitForDeployment()
  console.log('Deployed!')
  console.log(`MyNFT Contract deployed to ${myNFT.target}`)

  // * only verify on testnets or mainnets.
  if (
    network !== 'hardhat' &&
    network !== 'localhost' &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(myNFT.target.toString(), args)
  }
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    })
    console.log('Verified!')
  } catch (e: any) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!')
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
