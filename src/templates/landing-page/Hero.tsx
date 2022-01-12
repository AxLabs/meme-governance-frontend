import React from 'react';

import Link from 'next/link';

import { Background } from '../../background/Background';
import { Button } from '../../button/Button';
import { HeroOneButton } from '../../hero/HeroOneButton';
import { Section } from '../../layout/Section';
import { NavbarTwoColumns } from '../../navigation/NavbarTwoColumns';
import { Logo } from '../commons/Logo';

const Hero = () => (
  <Background color="bg-primary-100">
    <Section 
      yPadding="py-6" 
      background="bg-primary-700"
      maxWidth="max-w-screen-lg"
    >
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="https://github.com/AxLabs/meme-governance-frontend">
            <a>GitHub</a>
          </Link>
        </li>
        <li>
          <Link href="/dapp">
            <a>DApp</a>
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-3 pt-14 pb-28">
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
        <div class="flex justify-center align-center">
          <img 
            className="w-3/5 m-auto"
            src={`${process.env.baseUrl}/assets/images/inter1.png`} 
          />
        </div>
      </div>
    </div>
  </Background>
);

export { Hero };
