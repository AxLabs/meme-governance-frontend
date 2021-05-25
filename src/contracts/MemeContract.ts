import { NeoLineN3Interface } from '../utils/neoline/neoline';

const MEME_CONTRACT_HASH = `0x${'3b4572c517d08a8ba46632cc35f45f4ca8081a01'}`;
// const NO_OWNER_ZEROS_BASE64 = 'AAAAAAAAAAAAAAAAAAAAAAAAAAA=';

const MemeContract = {

  getMemes: async (
    neoLine: NeoLineN3Interface
  ) => {
    const result = await neoLine.invokeRead({
      scriptHash: MEME_CONTRACT_HASH,
      operation: 'getMemes',
      args: [{ type: 'Integer', value: '0' }],
      signers: []
    });
    console.log('getMemes result:', result);
    return result;
  },

  updateContractState: async (
    neoLine: NeoLineN3Interface,
    setContractState: (updatedState: MemeContractState) => void
  ) => {
    const updatedContractState: MemeContractState = { memes: [] };
    const memesResult: any = await MemeContract.getMemes(neoLine);
    updatedContractState.memes.push({
      memesResult
    });
    setContractState(updatedContractState);
  }
};

export type MemeContractState = {
  memes: any[];
};

// export type Meme = {
//   id: string;
//   description: string;
//   url: string;
//   imageHash: string;
// };

export { MemeContract };
