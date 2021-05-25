import React from 'react';

/**
 * Content that is rendered when the NeoLine extension has not been
 * detected.
 */
export default function InstallationInstructions() {
  return (
    <div>
      <a href="https://chrome.google.com/webstore/detail/neoline/cphhlgmgameodnhkjdmkpanlelnlohao">
        NeoLine
      </a>
      {' '}
      is required to use this website
    </div>
  );
}
