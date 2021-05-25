import React from 'react';

const Memes = () => (
  <div className="container flex my-10 mx-auto px-4 md:px-12">
    <div className="bg-white w-1/2 m-auto border-1  border-dashed border-gray-100 shadow-md rounded-lg overflow-hidden">
      <img src="https://via.placeholder.com/400x300" alt="" className="w-full object-cover object-center" />
      <div className="p-4">
        <p className="mb-1 text-gray-900 font-semibold">Card Title</p>

        <span className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugit hic ab quos eos
          quisquam labore minus, dignissimos porro explicabo distinctio.</span>

        <div className="mt-8 mb-3">
          <a href="#"
             className="px-4 py-2 bg-teal-500 shadow-lg border rounded-lg text-white uppercase font-semibold tracking-wider focus:outline-none focus:shadow-outline hover:bg-teal-400 active:bg-teal-400">Card
            Button</a>
        </div>
      </div>
    </div>
  </div>
);

export { Memes };
