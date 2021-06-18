import React, { useState } from 'react';

import { Meme, MemeContractState } from '../../contracts/MemeContract';
import { MemeGovernanceContract } from '../../contracts/MemeGovernanceContract';
import ConfirmDialog from '../../dialog/ConfirmDialog';
import { NeoLineN3Interface } from '../../utils/neoline/neoline';
import { MemeEntry } from './MemeEntry';

export type OnProposeToRemoveConfirmationData = {
  neoLine: NeoLineN3Interface;
  meme: Meme;
};

const onProposeToRemoveConfirmation = async function (
  onProposeToRemoveConfirmationData: OnProposeToRemoveConfirmationData,
) {
  console.log('proposal to be sent: ', onProposeToRemoveConfirmationData);
  const { neoLine, meme } = onProposeToRemoveConfirmationData;
  const result = await MemeGovernanceContract.proposeRemoval(neoLine, meme.id);
  console.log('tx: ', result);
};

type MemesProps = {
  neoLine: NeoLineN3Interface;
  memeContractState: MemeContractState
};

const Memes = ({ neoLine, memeContractState }: MemesProps) => {
  const [proposeToRemoveDialogOpen, setProposeToRemoveDialogOpen] = useState(false);
  const [currentMemeForDialog, setCurrentMemeForDialog] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 auto-col-max auto-col-min my-10 mx-10 mx-auto px-4 md:px-12 gap-5 items-center justify-center">
        {memeContractState.memes.map((m, index) => (
          <MemeEntry
            key={index}
            setProposeToRemoveDialogOpen={setProposeToRemoveDialogOpen}
            setCurrentMemeForDialog={setCurrentMemeForDialog}
            memeContractEntry={m}
          />
        ))}
      </div>
      <ConfirmDialog
        title="Create a Proposal to Remove"
        open={proposeToRemoveDialogOpen}
        onClose={() => setProposeToRemoveDialogOpen(false)}
        onConfirm={onProposeToRemoveConfirmation}
        onConfirmData={{
          neoLine,
          meme: currentMemeForDialog,
        }}
        confirmButtonText="Yes, let's remove this crap."
      >
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Are you sure you would like to create the proposal to remove this meme?
          </span>
        </div>
      </ConfirmDialog>
    </>
  );
};

export { Memes };
