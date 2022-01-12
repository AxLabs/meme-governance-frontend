import React, { ReactNode } from 'react';

import Link from 'next/link';

import className from 'classnames';

type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
};

const NavbarTwoColumns = (props: INavbarProps) => {
  const navbarTwoColumnClass = className('flex', 'flex-wrap', 'justify-between', 'items-center');
  
  return ( 
    <div className={navbarTwoColumnClass}>
      <div>
        <Link href="/">
          <a>{props.logo}</a>
        </Link>
      </div>

      <nav>
        <ul className="navbar flex items-center font-medium text-xl text-primary-500">
          {props.children}
        </ul>
      </nav>

      <style jsx>
        {`
          .navbar :global(li:not(:first-child)) {
            @apply mt-0;
          }

          .navbar :global(li:not(:last-child)) {
            @apply mr-5;
          }
        `}
      </style>
    </div>
  );
};

export { NavbarTwoColumns };
