import React from 'react';

import { VerticalFeatureRow } from '../../feature/VerticalFeatureRow';
import { Section } from '../../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Example of a Governance dApp"
    description="This dApp demonstrates a DAO (Decentralized Autonomous Organization) that controls Memes in a protocol."
  >
    <VerticalFeatureRow
      title="What are the current elected memes?"
      description="You can fetch the current elected memes. These are the coolest and most hyped Memes, ever. They are elected in a totally decentralized way!"
      image="/assets/images/dodge-meme.png"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="Create proposals to add NEW memes!"
      description="Yes, we all know that there's always new (and cooler) memes around. You can make a proposal to add new memes in the protocol. With the minimum quorum of 3 users holding GAS, your proposal can get elected... or not. 😅"
      image="/assets/images/drake-yes-meme.png"
      imageAlt="Create proposals to add memes."
      reverse
    />
    <VerticalFeatureRow
      title="Propose to get rid of the worst..."
      description="If you don't agree with an elected Meme, you can make proposals to get them removed from the protocol. Yeah, that simple. It's your chance to tell how bad and not funny those memes are... 💩"
      image="/assets/images/drake-no-meme.png"
      imageAlt="Create proposals to remove memes."
    />
  </Section>
);

export { VerticalFeatures };
