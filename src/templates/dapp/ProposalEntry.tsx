import React from 'react';

import Link from 'next/link';

import { Meme } from '../../contracts/MemeContract';
import { MemeGovernanceProposal } from '../../contracts/MemeGovernanceContract';

type ProposalEntryProps = {
  govContractEntry: MemeGovernanceProposal;
  setVoteDialogOpen: any;
  setExecuteDialogOpen: any;
  setCurrentProposalForDialog: any;
  setCurrentVoteAction: any;
};

const ProposalEntry = (
  {
    govContractEntry, setVoteDialogOpen, setExecuteDialogOpen,
    setCurrentProposalForDialog, setCurrentVoteAction,
  }: ProposalEntryProps,
) => {
  let proposalTypeBadge;
  if (govContractEntry.create) {
    proposalTypeBadge = <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Create</span>;
  } else {
    proposalTypeBadge = <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Remove</span>;
  }

  let inProgressBadge;
  if (govContractEntry.voteInProgress) {
    inProgressBadge = <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Yes</span>;
  } else {
    inProgressBadge = <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">No</span>;
  }

  let memeIdElement;
  if ((govContractEntry.meme as Meme[]).length == 0) {
    memeIdElement = <span className="font-medium">Not Defined</span>;
  } else if ((govContractEntry.meme as Meme[]).length > 1) {
    memeIdElement = <span className="font-medium">Multiple Memes</span>;
  } else {
    memeIdElement = <span className="font-medium">{govContractEntry.meme[0].id}</span>;
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          {memeIdElement}
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        {proposalTypeBadge}
      </td>
      <td className="py-3 px-6 text-center">
        {inProgressBadge}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center">
          {govContractEntry.votesInFavor}
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center">
          {govContractEntry.votesAgainst}
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <div className="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
            <Link href="">
              <a onClick={() => {
                setCurrentProposalForDialog(govContractEntry);
                setCurrentVoteAction(true);
                setVoteDialogOpen(true);
              }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                  />
                </svg>
              </a>
            </Link>
          </div>
          <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
            <Link href="">
              <a onClick={() => {
                setCurrentProposalForDialog(govContractEntry);
                setCurrentVoteAction(false);
                setVoteDialogOpen(true);
              }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
                  />
                </svg>
              </a>
            </Link>
          </div>
          <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
            <Link href="">
              <a onClick={() => {
                setCurrentProposalForDialog(govContractEntry);
                setExecuteDialogOpen(true);
              }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};

export { ProposalEntry };
