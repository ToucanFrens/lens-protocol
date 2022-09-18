import { ethers } from 'hardhat';
import { LensHub__factory } from '../typechain-types';
import { waitForTx } from '../tasks/helpers/utils';

async function main() {
  //Variables
  const accounts = await ethers.getSigners();
  const governance = accounts[0];

  const lensHub_proxy = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5';
  const NCTRetireCollectModuleAddr = '0x6bDddAFa4d8C383d09B50a08F1Dd338471f928Ae';

  //Lens core
  const lensHub = LensHub__factory.connect(lensHub_proxy, governance);

  //Execution
  await waitForTx(lensHub.whitelistCollectModule(NCTRetireCollectModuleAddr, true));

  console.log(`Module whitelisted.`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
