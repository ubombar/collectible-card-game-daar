import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'

const deployer: DeployFunction = async hre => {
  if (hre.network.config.chainId !== 1337) return
  const { deployer } = await hre.getNamedAccounts()
  const cardManagerAddress=await hre.deployments.deploy('CardManager', { from: deployer, log: true })
  const marketAddress = await hre.deployments.deploy('Market', { from: deployer, log: true,  args: [cardManagerAddress.address]})
  await hre.deployments.deploy('Main', { from: deployer, log: true,  args: [cardManagerAddress.address, marketAddress.address]})
}


export default deployer
