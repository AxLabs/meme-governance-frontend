# Meme Governance Frontend

This repo is the frontend for the Meme Governance dApp example.

It contains:

- Landing page for your project (served on the `/` path, e.g., `http://localhost:8080/`)
- dApp functionality (served on the `/dapp` path, e.g., `http://localhost:8080/dapp`)

🚀 Written in [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [TypeScript](https://www.typescriptlang.org) ⚡️ 

## Features

Developer experience first:

- 🔥 [Next.js](https://nextjs.org) for Static Site Generator
- 🎨 Integrate with [Tailwind CSS](https://tailwindcss.com)
- 💅 [PostCSS](https://postcss.org) for processing [Tailwind CSS](https://tailwindcss.com)
- 🎉 Type checking [TypeScript](https://www.typescriptlang.org)
- ✏️ Linter with [ESLint](https://eslint.org)
- 🛠 Code Formatter with [Prettier](https://prettier.io)
- 🦊 SEO metadata, [JSON-LD](https://developers.google.com/search/docs/guides/intro-structured-data) and [Open Graph](https://ogp.me/) tags with [Next SEO](https://github.com/garmeeh/next-seo)
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- 💯 Maximize lighthouse score

Built-in feature from Next.js:

- ☕ Minify HTML & CSS
- 💨 Live reload
- ✅ Cache busting

## Requirements

- Node.js version 12 
- npm

## Getting started

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/AxLabs/meme-governance-frontend.git my-project-name
cd my-project-name
npm install
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your favorite browser to see your project. For your information, Next JS need to take some time to compile the project for your first time.

```
.
├── README.md            # README file
├── public
│   └── assets
│       └── images       # Image used by the template, it can be replaced by your own images
├── src
│   ├── background       # Atomic background component
│   ├── button           # Atomic button component
│   ├── cta              # Atomic cta component
│   ├── feature          # Atomic feature component
│   ├── footer           # Atomic footer component
│   ├── hero             # Atomic hero component
│   ├── layout           # Atomic layout component
│   ├── navigation       # Atomic navigation component
│   ├── pages            # Next JS pages includes index page
│   ├── styles           # Atomic styles component
│   ├── templates        # List of blocks components
│   └── utils            # Atomic utils component
├── tailwind.config.js   # Tailwind CSS configuration file
└── tsconfig.json        # TypeScript file
```

## Customization

You can easily configure the theme. Please change the following file:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your favicon, you can generate from https://favicon.io/favicon-converter/
- `src/styles/main.css`: your CSS file using Tailwind CSS
- `utils/Config.ts`: website configuration file
- `src/pages/index.tsx`: the index page of the theme use the `Base` component
- `src/template/Base.tsx`: the `Base` component using component blocks
- `src/templates/*`: the list of component blocks
- `src/*`: other folders in src are the atomic components used by components blocks

Here is the layer:

- the entry point: `index.tsx` in `src/pages`
- the `Base` template: `Base.tsx` in `src/templates`
- use component blocks from `src/templates/*`
- use atomic components from `src/*`

## Deploy to production

You can see the results locally in production mode with:

```
$ npm run build
$ npm run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```
npm run build-prod
```

Now, your theme is ready to be deployed. All generated files are located at `dist` folder, which you can deploy with any hosting service.

## Acknowledgement

This repo is strongly based on templates provided by [CreativeDesignsGuru](https://creativedesignsguru.com). Thanks for it! 👏

## License

Licensed under the MIT License.

See [LICENSE](LICENSE) for more information.

---

Made with ♥ by [AxLabs](https://axlabs.com)
