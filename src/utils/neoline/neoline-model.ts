type NeoType = 'Address' | 'Boolean' | 'Integer';

type TypedValue = { type: NeoType; value: string | boolean };

type InvokeReadArgs = {
  scriptHash: string;
  operation: string;
  args: TypedValue[];
};

type InvokeWriteArgs = {
  fee?: string;
  broadcastOverride?: boolean;
};

type NeoAccount = {
  address: string;
  label: string
};

type Signers = {
  signers: Signer[];
};

type Signer = {
  account: string;
  scopes: number
};

export type {
  InvokeReadArgs, InvokeWriteArgs, NeoAccount, Signers, Signer, TypedValue,
};
