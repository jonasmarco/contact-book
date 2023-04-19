# ContactBook | Meus Contatos

## What is inside?

This project uses lot of stuff as:

- Styled Components
- TypeScript
- React Query
- React Hook Form
- Jest
- React Testing Library
- Storybook
- Eslint
- Prettier
- Husky
- Axios

## Getting Started

First install the global dependencies

```bash
npm install -g json-server
```

Then install the project dependencies

```bash
yarn
```

Run the JSON SERVER in a separate terminal

```bash
json-server --watch mock/db.json
```

Then run the development server

```bash
yarn dev
```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Commands

- `dev`: runs your application on `localhost:5173`
- `build`: creates the production build version
- `storybook`: runs the storybook stories
- `build-storybook`: create the build storybook
- `test`: runs jest to test all components
- `test:watch`: runs jest to test all components in watch mode

## Pay attention

- This backend local server (JSON SERVER API) is just to provide the data to the frontend, never use it in production.
