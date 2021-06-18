import React, { Dispatch, useEffect, useState } from 'react';

import { sha256 } from 'js-sha256';
import Link from 'next/link';

import { Button } from '../../button/Button';
import { Meme, MemeContract, MemeContractState } from '../../contracts/MemeContract';
import {
  MemeGovernanceContract,
  MemeGovernanceContractState,
} from '../../contracts/MemeGovernanceContract';
import ConfirmDialog from '../../dialog/ConfirmDialog';
import { NeoLineN3Init, NeoLineN3Interface } from '../../utils/neoline/neoline';
import InstallationInstructions from './InstallationInstructions';
import { Memes } from './Memes';
import { Proposals } from './Proposals';
import SplashScreen from './SplashScreen';

const SPLASH_SCREEN_DURATION_MS = 5000;

export type OnConfirmData = {
  neoLine: NeoLineN3Interface;
  newProposalMeme: Meme;
  setNewProposalMeme: Dispatch<any>;
};

async function confirmSubmitProposal(onConfirmData: OnConfirmData) {
  console.log('confirmSubmitProposal', onConfirmData);
  const { neoLine, newProposalMeme, setNewProposalMeme } = onConfirmData;
  const result = await MemeGovernanceContract.proposeNewMeme(
    neoLine, newProposalMeme,
  );
  console.log('tx: ', result);
  if (result.txid != null && result.txid.length > 0) {
    setNewProposalMeme({
      id: '',
      description: '',
      url: '',
      imageHash: '',
    });
  }
}

const DAppMain = () => {
  const [neoLine, setNeoLine] = useState<NeoLineN3Interface | null>(null);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [govContractState, setGovContractState] = useState<MemeGovernanceContractState>({
    proposals: [],
  });
  const [memeContractState, setMemeContractState] = useState<MemeContractState>({
    memes: [],
  });
  const [newProposal, setNewProposal] = useState<Meme>({
    id: '',
    description: '',
    url: '',
    imageHash: '',
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = function (evt: any) {
    const { value } = evt.target;
    setNewProposal({
      ...newProposal,
      [evt.target.name]: value,
    });
    if (evt.target.name === 'url') {
      // TODO: check if the input is really a URL. :-)
      fetch(value, {
        method: 'GET',
      })
        .then((response) => response.blob())
        .then((blob) => {
          const fileBlob: Blob = new Blob([blob]);
          console.log('file size:', fileBlob.size);
          let blobArrayBuffer: ArrayBuffer | null | string | undefined;
          const fileReader: FileReader = new FileReader();
          fileReader.onload = function (event) {
            if (event.target) {
              blobArrayBuffer = event.target?.result;
              if (blobArrayBuffer) {
                const imageHash = sha256(blobArrayBuffer);
                console.log('imageHash: ', imageHash);
                setNewProposal({
                  ...newProposal,
                  [evt.target.name]: value,
                  imageHash,
                });
              }
            }
          };
          fileReader.readAsArrayBuffer(blob);
        })
        .catch((e) => {
          console.log(e);
          setNewProposal({
            ...newProposal,
            [evt.target.name]: value,
            imageHash: '',
          });
        });
    }
  };

  useEffect(() => {
    async function updateContractsState() {
      const neoLineObj = await NeoLineN3Init();
      setNeoLine(neoLineObj);
      MemeGovernanceContract.updateContractState(neoLineObj, setGovContractState);
      MemeContract.updateContractState(neoLineObj, setMemeContractState);
    }
    async function initNeoLine() {
      console.log('initializing neoline...');
      const neoLineObj = await NeoLineN3Init();
      setNeoLine(neoLineObj);
      await MemeGovernanceContract.updateContractState(neoLineObj, setGovContractState);
      await MemeContract.updateContractState(neoLineObj, setMemeContractState);
      window.addEventListener('NEOLine.NEO.EVENT.BLOCK_HEIGHT_CHANGED', updateContractsState);
    }

    if ((window as any).NEOLineN3) {
      console.log('NEOLineN3 is already initialized!');
      window.addEventListener('NEOLine.NEO.EVENT.BLOCK_HEIGHT_CHANGED', updateContractsState, true);
    } else {
      console.log('NEOLineN3 is not yet initialized...');
      window.addEventListener('NEOLine.NEO.EVENT.READY', initNeoLine, true);
    }
    return () => {
      window.removeEventListener('NEOLine.NEO.EVENT.BLOCK_HEIGHT_CHANGED', updateContractsState);
      window.removeEventListener('NEOLine.NEO.EVENT.READY', initNeoLine);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setShowSplashScreen(false), SPLASH_SCREEN_DURATION_MS);
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  } if (neoLine) {
    return (
      <div className="grid items-center justify-center">
        <div className="mx-5">
          <div className="grid grid-cols-1 grid-rows-2 flex-wrap">
            <>
              <span className="text-base md:text-xl font-bold">Memes:</span>
            </>
            <Memes neoLine={neoLine} memeContractState={memeContractState} />
          </div>
        </div>
        <div className="mx-5">
          <div className="grid grid-cols-4">
            <span className="text-base md:text-xl font-bold">Proposals:</span>
            <div />
            <div />
            <div>
              <Link href="">
                <a>
                  <Button>
                    <button onClick={() => setConfirmOpen(true)}>
                      <span className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 23 23"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        New Proposal
                      </span>
                    </button>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <Proposals
            neoLine={neoLine}
            govContractState={govContractState}
            memeContractState={memeContractState}
          />
          <ConfirmDialog
            title="New Proposal"
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={confirmSubmitProposal}
            onConfirmData={{
              neoLine,
              newProposalMeme: newProposal,
              setNewProposalMeme: setNewProposal,
            }}
            confirmButtonText="Create"
          >

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Meme ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="id"
                type="text"
                placeholder="memeId"
                value={newProposal.id}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                type="text"
                placeholder="description"
                value={newProposal.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Meme URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="url"
                type="text"
                placeholder="memeUrl"
                value={newProposal.url}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Hash
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="imageHash"
                type="text"
                placeholder="imageHash"
                value={newProposal.imageHash}
                onChange={handleChange}
              />
            </div>
          </ConfirmDialog>
        </div>
      </div>
    );
  }
  return <InstallationInstructions />;
};

export { DAppMain };
