import { ethers } from 'hardhat';

async function main() {
  const HUB = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5';
  const MODULEGLOBALS = '0xcbCC5b9611d22d11403373432642Df9Ef7Dd81AD';
  const NCTRetireCollectModule = await ethers.getContractFactory('NCTRetireCollectModule');
  const NCTModule = await NCTRetireCollectModule.deploy(HUB, MODULEGLOBALS);

  await NCTModule.deployed();

  console.log(`Deployed Contract to ${NCTModule.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
