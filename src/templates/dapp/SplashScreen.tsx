import React from 'react';

/**
 * Content that is rendered for the first few seconds after the page
 * is loaded (while waiting for the NeoLine initialization event).
 */
export default function SplashScreen() {
  return (
    <div className="text-center text-bold py-6">
      <p>Looking for wallet... wait a bit.</p>
    </div>
  );
}
