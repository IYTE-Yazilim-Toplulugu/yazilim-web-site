## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

-------------------------------------------------------------------------------
New Components:
- Free Swiper
- Auto Swiper

Changes:
- Optimized responsive-header for all pages.
- Changed file structure for better organization.

TODO:
- Fix the auto swiper to work with the new structure.
- Add seperator to header.
- Fix tailwind color variables.
- Is there any requirement for system theme and color selections?
- Will we use a header for every page?
- Home page container queue
- We are using a template but its include a lot of deprecated dependencies and leak of optimization for new features.
- Template especially uses clsx library for classnames but its so old.(i will use just tailwindcss)

- Fix performance issues on mobile side
- Use Frame Motion lib for all animations
- Add other page routes to header
