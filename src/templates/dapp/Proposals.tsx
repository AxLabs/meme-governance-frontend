import React from 'react';
import {ProposalEntry} from "./ProposalEntry";

const Proposals = ({govContractState, memeContractState}) => (
    <div
      className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden"
    >
      <div className="w-full lg:w-5/6">
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
              <ProposalEntry govContractState={govContractState}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
);

export { Proposals };
