import React from 'react';
import {MemeEntry} from "./MemeEntry";
import {MemeContractState} from "../../contracts/MemeContract";

type MemesProps = {
    memeContractState: MemeContractState
};

const Memes = ({memeContractState}: MemesProps) => (
  <div className="container flex my-10 mx-auto px-4 md:px-12">
    <MemeEntry memeContractState={memeContractState}/>
  </div>
);

export { Memes };
