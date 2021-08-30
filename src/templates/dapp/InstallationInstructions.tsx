import React from 'react';

import Link from 'next/link';

/**
 * Content that is rendered when the NeoLine extension has not been
 * detected.
 */
export default function InstallationInstructions() {
  return (
    <div className="text-center text-bold py-6">
      <span className="neoline-link">
        <Link href="https://chrome.google.com/webstore/detail/neoline/cphhlgmgameodnhkjdmkpanlelnlohao">
          <a target="_blank" rel="noreferrer">
            NeoLine
          </a>
        </Link>
      </span>{' '}
      is required to use this dApp.
      <style jsx>
        {`
          .neoline-link :global(a) {
            @apply text-green-400;
          }

          .neoline-link :global(a:hover) {
            @apply underline;
            @apply font-bold;
          }
        `}
      </style>
    </div>
  );
}
