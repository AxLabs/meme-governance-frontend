import React, { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="text-5xl text-gray-900 font-bold whitespace-pre-line leading-hero">
      {props.title}
    </h1>
    <img 
      className="w-3/6 m-auto mt-2"
      src={`${process.env.baseUrl}/assets/images/yelunderline.png`} 
    />
    <div className="text-2xl mt-4 mb-16">{props.description}</div>
    {props.button}
  </header>
);

export { HeroOneButton };
