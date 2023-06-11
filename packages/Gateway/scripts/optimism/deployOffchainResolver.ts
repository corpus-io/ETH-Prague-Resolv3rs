/* eslint no-console: 0 */

import { ethers } from 'hardhat';
const OPTIMISM_DEPLOYER = '0xb1D396c618E962B8f0492525586D79B1E2e5Aa76';
const ENS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
async function main() {
    const accounts = await (ethers as any).getSigners();
    console.log('Deployment account: ' + accounts[0].address);
    const OffchainResolver = await ethers.getContractFactory(
        'OffchainResolver',
    );

    const b = await ethers.provider.getBalance(accounts[0].address)

    console.log(b)

    const offchainResolver = await OffchainResolver.deploy(
        ENS,
        'https://gnosis-resolver.herokuapp.com/420/{sender}/{data}/',
        OPTIMISM_DEPLOYER,
        [OPTIMISM_DEPLOYER],
  
    );

    await offchainResolver.deployed();

    console.log(`Deployed to ${offchainResolver.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
