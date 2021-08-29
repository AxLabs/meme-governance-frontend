import React from 'react';

import Link from 'next/link';

import { Background } from '../../background/Background';
import { Button } from '../../button/Button';
import { HeroOneButton } from '../../hero/HeroOneButton';
import { Section } from '../../layout/Section';
import { NavbarTwoColumns } from '../../navigation/NavbarTwoColumns';
import { Logo } from '../commons/Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="https://github.com/AxLabs/meme-governance-frontend">
            <a>GitHub</a>
          </Link>
        </li>
        <li>
          <Link href="/dapp">
            <a>dApp</a>
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'The Best Memes, ever.\n'}
            Built and Governed on <span className="text-primary-500">Neo N3</span>
          </>
        }
        description="Propose new ones, vote on the best, and dump the shittiest..."
        button={
          <Link href="/dapp">
            <a>
              <Button xl>Let&lsquo;s do it!</Button>
            </a>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
