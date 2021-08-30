import React, { ReactNode } from 'react';

import Emoji from '../feature/Emoji';

type ICTABannerProps = {
  title: string;
  subtitle: string;
  button: ReactNode;
  emoji?: string;
};

const CTABanner = (props: ICTABannerProps) => (
  <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
    <div className="text-2xl font-semibold">
      <div className="text-gray-900">{props.title}</div>
      <div className="text-primary-500">
        {props.subtitle}
        <span> </span>
        <Emoji symbol={props.emoji} />
      </div>
    </div>

    <div className="whitespace-no-wrap mt-3 sm:mt-0 sm:ml-2">{props.button}</div>
  </div>
);

export { CTABanner };
