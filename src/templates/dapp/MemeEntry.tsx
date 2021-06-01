import React from 'react';

const MemeEntry = ({memeContractState}) => (
    <>
      {memeContractState.memes.map((m) => (
          <div className="bg-white w-1/2 m-auto border-1  border-dashed border-gray-100 shadow-md rounded-lg overflow-hidden">
            <img src={m.url} alt="" className="w-full object-cover object-center" />
            <div className="p-4">
              <p className="mb-1 text-gray-900 font-semibold">Meme ID: {m.id}</p>

              <span className="text-gray-700">{m.description}</span>

              <div className="mt-8 mb-3">
                <a href="#"
                   className="px-4 py-2 bg-teal-500 shadow-lg border rounded-lg text-white uppercase font-semibold tracking-wider">Card
                  Button</a>
              </div>
            </div>
          </div>
      ))}
    </>
);

export { MemeEntry };
