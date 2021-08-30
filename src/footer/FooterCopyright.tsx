import React from 'react';

import { Config } from '../utils/Config';

const FooterCopyright = () => (
  <div className="footer-copyright">
    © Copyright {new Date().getFullYear()} {Config.title}. Powered with{' '}
    <span role="img" aria-label="Love">
      ♥
    </span>{' '}
    by <a href="https://axlabs.com">AxLabs</a>
    {}
    <style jsx>
      {`
        .footer-copyright :global(a) {
          @apply text-red-500;
        }

        .footer-copyright :global(a:hover) {
          @apply underline;
          @apply font-extrabold;
        }
      `}
    </style>
  </div>
);

export { FooterCopyright };
