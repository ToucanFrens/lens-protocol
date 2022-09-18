import { task } from 'hardhat/config';
import { LensHub__factory, MockProfileCreationProxy__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from '../tasks/helpers/utils';

task('create-profile', 'creates a profile').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);

  const lensHub_proxy = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5';
  const mock_profile_creation_proxy = '0x4fe8deB1cf6068060dE50aA584C3adf00fbDB87f';
  const lensHub = LensHub__factory.connect(lensHub_proxy, governance);
  const profileCreation = MockProfileCreationProxy__factory.connect(
    mock_profile_creation_proxy,
    governance
  );

  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'annitho',
    imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
  };

  await waitForTx(profileCreation.connect(user).proxyCreateProfile(inputStruct));
  const profileID = await lensHub.getProfileIdByHandle('annitho');
  console.log(`Total supply: ${await lensHub.totalSupply()}`);
  console.log(
    `Profile owner: ${await lensHub.ownerOf(profileID)}, user address (should be the same): ${
      user.address
    }`
  );
  console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('annitho')}`);
});
