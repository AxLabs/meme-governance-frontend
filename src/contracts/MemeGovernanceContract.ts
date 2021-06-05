import { wallet as wallet3 } from '@cityofzion/neon-js';

import { NeoLineN3Interface } from '../utils/neoline/neoline';
import { TypedValue } from '../utils/neoline/neoline-model';
import { fromStackItemToMeme, Meme } from './MemeContract';

const MEME_GOVERNANCE_CONTRACT_HASH = `0x${'44588563c5a96a9d92c5b698e796c2eea7c99f0a'}`;
// const NO_OWNER_ZEROS_BASE64 = 'AAAAAAAAAAAAAAAAAAAAAAAAAAA=';

const MemeGovernanceContract = {

  getProposals: async (
    neoLine: NeoLineN3Interface,
  ) => {
    const result = await neoLine.invokeRead({
      scriptHash: MEME_GOVERNANCE_CONTRACT_HASH,
      operation: 'getProposals',
      args: [{
        type: 'Integer',
        value: '0',
      }],
      signers: [],
    });
    console.log('getProposals result:', result);

    let proposals: MemeGovernanceProposal[] = [];
    if (result.state === 'HALT') {
      proposals = fromStackToMemeGovernanceProposal(result.stack);
    }
    return proposals;
  },

  proposeNewMeme: async (
    neoLine: NeoLineN3Interface,
    meme: Meme,
  ) => {
    const account = await neoLine.getAccount();
    if (!account) {
      return;
    }
    const result = await neoLine.invoke({
      scriptHash: MEME_GOVERNANCE_CONTRACT_HASH,
      operation: 'proposeNewMeme',
      args: [
        {
          // name: "memeId",
          type: 'String',
          value: `${meme.id}`,
        },
        {
          // name: "description",
          type: 'String',
          value: `${meme.description}`,
        },
        {
          // name: 'url',
          type: 'String',
          value: `${meme.url}`,
        },
        {
          // name: 'imageHash',
          type: 'String',
          value: `${meme.imageHash}`,
        },
      ],
      broadcastOverride: false,
      signers: [
        {
          account: wallet3.getScriptHashFromAddress(account.address),
          scopes: 128,
        },
      ],
    });
    console.log('proposeNewMeme result:', result);

    return result;
  },

  vote: async (
    neoLine: NeoLineN3Interface,
    memeId: string,
    inFavor: boolean,
  ) => {
    const account = await neoLine.getAccount();
    if (!account) {
      return;
    }
    const result = await neoLine.invoke({
      scriptHash: MEME_GOVERNANCE_CONTRACT_HASH,
      operation: 'vote',
      args: [
        {
          // name: "memeId",
          type: 'String',
          value: `${memeId}`,
        },
        {
          // name: "voter",
          type: 'Hash160',
          value: `${wallet3.getScriptHashFromAddress(account.address)}`,
        },
        {
          // name: 'inFavor',
          type: 'Boolean',
          value: `${inFavor}`,
        },
      ],
      broadcastOverride: false,
      signers: [
        {
          account: wallet3.getScriptHashFromAddress(account.address),
          scopes: 128,
        },
      ],
    });
    console.log('vote result:', result);

    return result;
  },

  execute: async (
    neoLine: NeoLineN3Interface,
    memeId: string,
  ) => {
    const account = await neoLine.getAccount();
    if (!account) {
      return;
    }
    const result = await neoLine.invoke({
      scriptHash: MEME_GOVERNANCE_CONTRACT_HASH,
      operation: 'execute',
      args: [
        {
          // name: "memeId",
          type: 'String',
          value: `${memeId}`,
        },
      ],
      broadcastOverride: false,
      signers: [
        {
          account: wallet3.getScriptHashFromAddress(account.address),
          scopes: 128,
        },
      ],
    });
    console.log('execute result:', result);

    return result;
  },

  proposeRemoval: async (
    neoLine: NeoLineN3Interface,
    memeId: string,
  ) => {
    const account = await neoLine.getAccount();
    if (!account) {
      return;
    }
    const result = await neoLine.invoke({
      scriptHash: MEME_GOVERNANCE_CONTRACT_HASH,
      operation: 'proposeRemoval',
      args: [
        {
          // name: "memeId",
          type: 'String',
          value: `${memeId}`,
        },
      ],
      broadcastOverride: false,
      signers: [
        {
          account: wallet3.getScriptHashFromAddress(account.address),
          scopes: 128,
        },
      ],
    });
    console.log('proposalRemoval result:', result);

    return result;
  },

  updateContractState: async (
    neoLine: NeoLineN3Interface,
    setContractState: (updatedState: MemeGovernanceContractState) => void,
  ) => {
    const updatedContractState: MemeGovernanceContractState = { proposals: [] };
    updatedContractState.proposals = await MemeGovernanceContract.getProposals(neoLine);
    setContractState(updatedContractState);
  },
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

export function fromStackToMemeGovernanceProposal(stack: TypedValue[]): MemeGovernanceProposal[] {
  const proposals: MemeGovernanceProposal[] = [];
  if (stack != null && stack.length > 0 && stack[0].type === 'Array') {
    const valueArray = (stack[0].value as any[]);
    valueArray.map((item) => {
      if (item.type === 'Array') {
        const proposalArray = (item.value as TypedValue[]);
        const p = {
          meme: [fromStackItemToMeme(proposalArray[0].value as TypedValue[])],
          create: (Number(proposalArray[1].value) == 1),
          voteInProgress: (Number(proposalArray[2].value) == 1),
          finalizationBlock: Number(proposalArray[3].value),
          votesInFavor: Number(proposalArray[4].value),
          votesAgainst: Number(proposalArray[5].value),
        };
        proposals.push(p);
      }
    });
  }
  console.log('proposals: ', proposals);
  return proposals;
}

export { MemeGovernanceContract };
