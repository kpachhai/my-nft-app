import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('MyNFT', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const MyNFT = await ethers.getContractFactory('MyNFT')
    const myNFT = await MyNFT.deploy(owner)

    return { myNFT, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { myNFT, owner } = await loadFixture(deployFixture)

      expect(await myNFT.owner()).to.equal(owner.address)
    })
  })
})
