import { NeoLineN3Interface } from '../utils/neoline/neoline';

const MEME_GOVERNANCE_CONTRACT_HASH = `0x${'43000f84c46df29e25d58a089d5564dbe23c15bc'}`;
// const NO_OWNER_ZEROS_BASE64 = 'AAAAAAAAAAAAAAAAAAAAAAAAAAA=';

const MemeGovernanceContract = {

  getProposals: async (
    neoLine: NeoLineN3Interface
  ) => {
    const result = await neoLine.invokeRead({
      scriptHash: MEME_GOVERNANCE_CONTRACT_HASH,
      operation: 'getProposals',
      args: [{ type: 'Integer', value: '0' }],
      signers: []
    });
    console.log('getProposals result:', result);
    return result;
  },

  updateContractState: async (
    neoLine: NeoLineN3Interface,
    setContractState: (updatedState: MemeGovernanceContractState) => void
  ) => {
    const updatedContractState: MemeGovernanceContractState = { proposals: [] };
    const proposalsResult: any = await MemeGovernanceContract.getProposals(neoLine);
    updatedContractState.proposals.push({
      proposalsResult
    });
    setContractState(updatedContractState);
  }
};

export type MemeGovernanceContractState = {
  proposals: any[];
};

// export type MemeGovernanceProposal = {
//   meme: Meme[];
//   create: boolean;
//   voteInProgress: boolean;
//   finalizationBlock: Number;
//   votesInFavor: Number;
//   votesAgainst: Number;
// };

export { MemeGovernanceContract };
