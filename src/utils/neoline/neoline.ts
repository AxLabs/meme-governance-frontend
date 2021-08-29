import { InvokeReadArgs, InvokeWriteArgs, NeoAccount, Signers, TypedValue } from './neoline-model';

type GetBalanceArgs = { address: string; contracts: string[] };

/**
 * Decalares a TypeScript inteface for the NeoLine N3 API as described at:
 * https://neoline.io/dapi/N3.html
 */
interface NeoLineN3Interface {
  getAccount(): Promise<NeoAccount>;

  getBalance(
    params: GetBalanceArgs[]
  ): Promise<{
    [address: string]: { contract: string; symbol: string; amount: string }[];
  }>;

  invoke(params: InvokeReadArgs & InvokeWriteArgs & Signers): Promise<any>;

  invokeRead(
    params: InvokeReadArgs & Signers
  ): Promise<{ script: string; stack: TypedValue[]; state: string }>;

  // Note that the order of items in the result array is not consistent with
  // the order of the items in the input array.
  invokeReadMulti(params: {
    invokeReadArgs: InvokeReadArgs[];
    signers: { account: string; scopes: number }[];
  }): Promise<{ script: string; stack: TypedValue[]; state: string }[]>;
}

function NeoLineN3Init(): Promise<NeoLineN3Interface> {
  // Use an async pattern as the global NEOLineN3 is not available while
  // the NEOLine.NEO.EVENT.READY event is still firing:
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(new (window as any).NEOLineN3.Init());
    }, 10)
  );
}

export { NeoLineN3Init };

export type { NeoLineN3Interface };
