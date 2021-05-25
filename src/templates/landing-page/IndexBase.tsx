import React from 'react';

import { Meta } from '../../layout/Meta';
import { Config } from '../../utils/Config';
import { Banner } from '../commons/Banner';
import { Footer } from '../commons/Footer';
import { Hero } from './Hero';
import { VerticalFeatures } from './VerticalFeatures';

const IndexBase = () => (
  <div className="antialiased text-gray-600">
    <Meta title={Config.title} description={Config.description} />
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
);

export { IndexBase };
