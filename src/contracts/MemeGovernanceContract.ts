import {NeoLineN3Interface} from '../utils/neoline/neoline';
import {Meme} from "./MemeContract";

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

    let proposals: MemeGovernanceProposal[] = [];
    if (result.state === 'HALT' && result.stack.length > 0 && result.stack[0].type === 'Array') {
      const valueArray = (result.stack[0].value as any[])
      if (valueArray.length > 0 && valueArray[0].type === 'Array') {
        const proposalArray = (valueArray[0].value as any[])
        const p = {
          meme: [],
          create: (Number(proposalArray[1].value) == 1),
          voteInProgress: (Number(proposalArray[2].value) == 1),
          finalizationBlock: Number(proposalArray[3].value),
          votesInFavor: Number(proposalArray[4].value),
          votesAgainst: Number(proposalArray[5].value)
        }
        proposals.push(p);
      }
    }
    return proposals;
  },

  updateContractState: async (
    neoLine: NeoLineN3Interface,
    setContractState: (updatedState: MemeGovernanceContractState) => void
  ) => {
    const updatedContractState: MemeGovernanceContractState = { proposals: [] };
    updatedContractState.proposals = await MemeGovernanceContract.getProposals(neoLine);
    setContractState(updatedContractState);
  }
};

export type MemeGovernanceContractState = {
  proposals: MemeGovernanceProposal[];
};

export type MemeGovernanceProposal = {
  meme: Meme[];
  create: boolean;
  voteInProgress: boolean;
  finalizationBlock: Number;
  votesInFavor: Number;
  votesAgainst: Number;
};

export { MemeGovernanceContract };
