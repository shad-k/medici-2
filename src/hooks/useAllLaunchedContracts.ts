import React from 'react';
import useSWR from 'swr';
import apiClient from '../utils/apiClient';
import { ethers, utils } from 'ethers';
import { CONFIG } from '../utils/config';

import { Contract } from '../model/types';

const localenv = CONFIG.DEV;

type UseProjectsReturn = {
  data?: Array<Contract>;
  error?: any;
};

const useAllLaunchedContracts = (
  masterAddress: string,
  connectedChain: string
): UseProjectsReturn => {
  // console.log("Getting contracts for " + masterAddress + " on chain " + connectedChain)
  const { data, error } = useSWR<Array<Contract>>(
    [localenv.api.paths.getAllLaunchedContracts],
    async (url) =>
      await apiClient
        .post(
          url,
          {
            masterAddress: utils.getAddress(masterAddress),
            chainID: parseInt(connectedChain, 16),
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then((res) => {
          // console.log(res.data.launchedContracts)
          return res.data.launchedContracts;
        })
  );
  return { data, error };
};

export default useAllLaunchedContracts;
