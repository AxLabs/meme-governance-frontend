import {NeoLineN3Interface} from '../utils/neoline/neoline';

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

    let memes: Meme[] = [];
    if (result.state === 'HALT' && result.stack.length > 0 && result.stack[0].type === 'Array') {
      const valueArray = (result.stack[0].value as any[])
      if (valueArray.length > 0 && valueArray[0].type === 'Array') {
        const proposalArray = (valueArray[0].value as any[])
        const p = {
          id: atob(proposalArray[0].value),
          description: atob(proposalArray[1].value),
          url: atob(proposalArray[2].value),
          imageHash: atob(proposalArray[3].value),
        }
        memes.push(p);
      }
    }
    return memes;
  },

  updateContractState: async (
    neoLine: NeoLineN3Interface,
    setContractState: (updatedState: MemeContractState) => void
  ) => {
    const updatedContractState: MemeContractState = { memes: [] };
    const memesResult: any = await MemeContract.getMemes(neoLine);
    updatedContractState.memes = memesResult;
    setContractState(updatedContractState);
  }
};

export type MemeContractState = {
  memes: Meme[];
};

export type Meme = {
  id: string;
  description: string;
  url: string;
  imageHash: string;
};

export { MemeContract };
