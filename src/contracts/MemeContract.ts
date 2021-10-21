import { NeoLineN3Interface } from '../utils/neoline/neoline';
import { TypedValue } from '../utils/neoline/neoline-model';

const MEME_CONTRACT_HASH = process.env.NEXT_PUBLIC_MEME_CONTRACT_HASH || '';

export type MemeContractState = {
  memes: Meme[];
};

export type Meme = {
  id: string;
  description: string;
  url: string;
  imageHash: string;
};

export function fromStackItemToMeme(item: TypedValue[]): Meme {
  let meme: Meme = {
    id: '',
    description: '',
    url: '',
    imageHash: '',
  };
  if (item.length > 0) {
    meme = {
      id: atob(item[0].value as string),
      description: atob(item[1].value as string),
      url: atob(item[2].value as string),
      imageHash: atob(item[3].value as string),
    };
  }
  return meme;
}

export function fromStackToMeme(stack: TypedValue[]): Meme[] {
  const memes: Meme[] = [];
  if (stack != null && (stack as any[]).length > 0 && stack[0].type === 'Array') {
    const valueArray = stack[0].value as TypedValue[];
    // TODO: Fix the array callback type
    // eslint-disable-next-line array-callback-return
    valueArray.map((item) => {
      if (item.type === 'Array') {
        const memeArrayItem = item.value as TypedValue[];
        const meme: Meme = fromStackItemToMeme(memeArrayItem);
        if (meme != null) {
          memes.push(meme);
        }
      }
    });
  }
  return memes;
}

const MemeContract = {
  getMemes: async (neoLine: NeoLineN3Interface) => {
    const result = await neoLine.invokeRead({
      scriptHash: MEME_CONTRACT_HASH,
      operation: 'getMemes',
      args: [
        {
          type: 'Integer',
          value: '0',
        },
      ],
      signers: [],
    });
    console.log('getMemes result:', result);

    let memes: Meme[] = [];
    if (result.state === 'HALT') {
      memes = fromStackToMeme(result.stack);
    }

    console.log('memes: ', memes);
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
  },
};

export { MemeContract };
