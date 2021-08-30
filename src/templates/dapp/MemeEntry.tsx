// TODO: Fix eslint errors
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch } from 'react';

import Link from 'next/link';

import { Meme } from '../../contracts/MemeContract';

type MemeEntryProps = {
  setProposeToRemoveDialogOpen: Dispatch<any>;
  setCurrentMemeForDialog: Dispatch<any>;
  memeContractEntry: Meme;
};

const MemeEntry = ({
  setProposeToRemoveDialogOpen,
  setCurrentMemeForDialog,
  memeContractEntry,
}: MemeEntryProps) => (
  <div className="bg-white max-w-sm border-1 border-dashed border-gray-100 shadow-md rounded-lg overflow-hidden">
    <img src={memeContractEntry.url} alt="" className="w-full object-cover object-center" />
    <div className="p-4">
      <p className="mb-1 text-gray-900">
        <span className="font-semibold">Meme ID: </span>
        {memeContractEntry.id}
      </p>

      <div className="flex mb-1 text-gray-900">
        <div className="flex gap-1">
          <span className="font-semibold">URL: </span>
          <Link href={memeContractEntry.url}>
            <a target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </Link>
        </div>
      </div>

      <div className="mb-1 text-gray-900">
        <span className="font-semibold">Description: </span>
        <p>
          <span className="text-gray-700">{memeContractEntry.description}</span>
        </p>
      </div>

      <div className="flex mb-1 text-gray-900 text-center text-justify">
        <div className="flex gap-1">
          <span className="font-semibold">Actions: </span>
          <Link href="">
            <a
              onClick={() => {
                setCurrentMemeForDialog(memeContractEntry);
                setProposeToRemoveDialogOpen(true);
              }}
            >
              <span className="flex bg-red-200 hover:bg-red-300 text-red-500 py-1 px-3 rounded-md text-xs">
                Proposal to Remove
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export { MemeEntry };
