import React from 'react';

import Link from 'next/link';

import { Button } from '../../button/Button';
import { CTABanner } from '../../cta/CTABanner';
import { Section } from '../../layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="Check the documentation to extend this dApp and create your own."
      subtitle="It's easy as a 'meme generator'. Really."
      button={(
        <Link href="https://neow3j.io/#/neo-n3/tutorials_and_examples/meme_governance_dapp">
          <a>
            <Button>Get Started</Button>
          </a>
        </Link>
      )}
      emoji="😅"
    />
  </Section>
);

export { Banner };
