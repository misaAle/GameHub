# GameHub

Future hub for simple multiplayer games

Pre-requisites:

-   Have node installed (v20.10.0 works)

Once repo has been cloned locally, run `npm install` and `npm run prepare`

-   This will install all dependencies required and setup husky for pre-commit hooks

To start the server, run `npm run start`

-   This will execute the "start" script defined in _package.json_, `nodemon server.js`

Navigate to your browser and open http://localhost:3000, and it should start the default tictactoe game

Prettier for formatting-

-   It is installed separately but should only be used in conjunction with ESLint
-   To run prettier formatting, `npm run format`
-   To read more about formatting style, check out [prettier.io](https://prettier.io)

Linting for catching bugs in JS/TS-

-   Also installed separately but it will also run prettier formatting to avoid conflicts thanks to [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

Pre-commit Hook-

-   [lint-staged](https://github.com/lint-staged/lint-staged) and [husky](https://github.com/typicode/husky) are used to run linting as part of pre-commit hook
-   Enables code styling and format checks before commiting
