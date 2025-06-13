# Chess Turnament

This app is currently optimized to handle a tournament of around 6 players on two teams. Both teams must be even.

<!-- - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->

## Installation and Use
1 - Clone or download main app folder locally.

2 - In code base, under: 
  
  chess-tournament/src

  - make a folder called data and add a file and call it:

  keys.ts

  - Then add this line and make your own secret key value:

  export const LOCAL_TOURNAMENTS_KEY = "[YOUR_OWN_KEY_NAME]"

3 - Open a terminal on your computer and navigate into the chess-tournament/ folder

4 - Run:

  npm install

5 - Once packages are installed, run:

  npm run dev

  - Then add this to your web browser of choice:

  http://localhost:5173/

  - You should be set to use the App!

### Upcoming features:
- Free for all tournament

<!-- ```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
``` -->