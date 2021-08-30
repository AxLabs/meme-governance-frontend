import React, { useState } from 'react';

import { MemeContractState } from '../../contracts/MemeContract';
import {
  MemeGovernanceContract,
  MemeGovernanceContractState,
  MemeGovernanceProposal,
} from '../../contracts/MemeGovernanceContract';
import ConfirmDialog from '../../dialog/ConfirmDialog';
import { NeoLineN3Interface } from '../../utils/neoline/neoline';
import { ProposalEntry } from './ProposalEntry';

export type OnVoteConfirmationData = {
  neoLine: NeoLineN3Interface;
  proposal: MemeGovernanceProposal;
  voteAction: boolean;
};

const onVoteConfirmation = async function (onVoteConfirmationData: OnVoteConfirmationData) {
  console.log('vote to be sent: ', onVoteConfirmationData);
  const { neoLine, proposal, voteAction } = onVoteConfirmationData;
  const result = await MemeGovernanceContract.vote(neoLine, proposal.meme[0].id, voteAction);
  console.log('tx: ', result);
};

export type OnExecuteConfirmationData = {
  neoLine: NeoLineN3Interface;
  proposal: MemeGovernanceProposal;
};

const onExecuteConfirmation = async function (
  onExecuteConfirmationData: OnExecuteConfirmationData
) {
  console.log('execution to be sent: ', onExecuteConfirmationData);
  const { neoLine, proposal } = onExecuteConfirmationData;
  const result = await MemeGovernanceContract.execute(neoLine, proposal.meme[0].id);
  console.log('tx: ', result);
};

type ProposalsProps = {
  govContractState: MemeGovernanceContractState;
  neoLine: NeoLineN3Interface;
  // TODO: Make sure it's not being used
  // eslint-disable-next-line react/no-unused-prop-types
  memeContractState: MemeContractState;
};

const Proposals = ({ govContractState, neoLine }: ProposalsProps) => {
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [executeDialogOpen, setExecuteDialogOpen] = useState(false);
  const [currentProposalForDialog, setCurrentProposalForDialog] = useState(null);
  const [currentVoteAction, setCurrentVoteAction] = useState<boolean | null>(null);

  return (
    <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="w-full">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Meme ID</th>
                <th className="py-3 px-6 text-center">Proposal Type</th>
                <th className="py-3 px-6 text-center">In Progress?</th>
                <th className="py-3 px-6 text-center">Votes: In Favor</th>
                <th className="py-3 px-6 text-center">Votes: Against</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {govContractState.proposals.map((p, index) => (
                <ProposalEntry
                  key={index}
                  setVoteDialogOpen={setVoteDialogOpen}
                  setExecuteDialogOpen={setExecuteDialogOpen}
                  setCurrentProposalForDialog={setCurrentProposalForDialog}
                  setCurrentVoteAction={setCurrentVoteAction}
                  govContractEntry={p}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog
        title="Vote on Proposal"
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
        onConfirm={onVoteConfirmation}
        onConfirmData={{
          neoLine,
          proposal: currentProposalForDialog,
          voteAction: currentVoteAction,
        }}
        confirmButtonText="Yes! Let's do it!"
      >
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Are you sure you would like to vote {currentVoteAction ? 'in favor' : 'against it'}?
          </span>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        title="Execute Proposal"
        open={executeDialogOpen}
        onClose={() => setExecuteDialogOpen(false)}
        onConfirm={onExecuteConfirmation}
        onConfirmData={{
          neoLine,
          proposal: currentProposalForDialog,
        }}
        confirmButtonText="Yes, execute it!"
      >
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Are you sure you would like to execute the proposal?
          </span>
        </div>
      </ConfirmDialog>
    </div>
  );
};

export { Proposals };
