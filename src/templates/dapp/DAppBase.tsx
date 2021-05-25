import React from 'react';

import Link from 'next/link';

import { Background } from '../../background/Background';
import { Button } from '../../button/Button';
import { Meta } from '../../layout/Meta';
import { Section } from '../../layout/Section';
import { NavbarTwoColumns } from '../../navigation/NavbarTwoColumns';
import { Config } from '../../utils/Config';
import { Footer } from '../commons/Footer';
import { Logo } from '../commons/Logo';
import { DAppMain } from './DAppMain';

const DAppBase = () => (
  <div className="antialiased text-gray-600">
    <Meta title={Config.title} description={Config.description} />
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>
          <li>
            <Link href="https://github.com/AxLabs/meme-governance-frontend">
              <a>FAQ</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <Button>Connect Wallet!</Button>
              </a>
            </Link>
          </li>
        </NavbarTwoColumns>
      </Section>
      <DAppMain />
    </Background>
    <Footer />
  </div>
);

export { DAppBase };
