import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite
} from 'wagmi'
import MyNFT from '../src/artifacts/contracts/MyNFT.sol/MyNFT.json'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const contractAddress = '0xcF756bb1C42BA4fdf4004DF746cED55EdD57bC91'

  const [recipient, setRecipient] = useState('')
  const [totalMinted, setTotalMinted] = useState(0)

  const { address } = useAccount()

  useContractRead({
    address: contractAddress,
    abi: MyNFT.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
    onSuccess(data) {
      setTotalMinted(Number(data as BigInt))
    }
  })

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: MyNFT.abi,
    functionName: 'mintNFT'
  })
  const {
    data: writeData,
    isLoading: writeLoading,
    write: mintNFT
  } = useContractWrite(config)

  const {
    data: writeDataWithRecipient,
    isLoading: writeLoadingWithRecipient,
    write: mintNFTWithRecipient
  } = useContractWrite({
    address: contractAddress,
    abi: [
      {
        name: 'mintNFT',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address'
          }
        ],
        outputs: []
      }
    ],
    functionName: 'mintNFT'
  })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to <a href=''>MyNFT App</a>
        </h1>

        <div className={styles.grid}>
          <h2>Total Minted by You: {totalMinted}</h2>
        </div>

        <div className={styles.grid}>
          {!writeLoading && (
            <>
              <input
                placeholder='Recipient Address'
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button
                disabled={!mintNFT && !mintNFTWithRecipient}
                onClick={() => {
                  recipient
                    ? mintNFTWithRecipient?.({ args: [recipient] })
                    : mintNFT?.()
                }}
              >
                Mint NFT
              </button>
            </>
          )}
          {(writeLoading || writeLoadingWithRecipient) && (
            <p>Please confirm the transaction on your wallet</p>
          )}
          {!writeLoading && (writeData || writeDataWithRecipient) && (
            <p>
              The transaction was sent! View it on{' '}
              {!recipient && writeData && (
                <a
                  href={`https://goerli.etherscan.io/tx/${writeData.hash}`}
                  target='_blank'
                >
                  Etherscan
                </a>
              )}
              {recipient && writeDataWithRecipient && (
                <a
                  href={`https://goerli.etherscan.io/tx/${writeDataWithRecipient.hash}`}
                  target='_blank'
                >
                  Etherscan
                </a>
              )}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
