# boilerplate-nodets-cleanarch

Node.js + TypeScript (ESM). Clean architecture layout.

## Requirements

- Node.js 22+
- [pnpm](https://pnpm.io/) (version pinned in `package.json`)

## Install

```bash
pnpm install
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server with watch (`tsx`) |
| `pnpm build` | Compile to `dist/` (`tsc`) |
| `pnpm start` | Run `dist/app.js` |
| `pnpm build:prod` | Production build (`tsconfig.build.json`) |
| `pnpm type-check` | `tsc --noEmit` |
| `pnpm lint:check` | ESLint |
| `pnpm lint:fix` | ESLint with `--fix` |
| `pnpm format` | Prettier (write) |
| `pnpm format:check` | Prettier (check only) |
| `pnpm test:run` | Jest (single run) |
| `pnpm test:watch` | Jest (watch) |
| `pnpm coverage` | Jest with coverage |
| `pnpm check:updates` | Outdated packages |
| `pnpm audit` | Dependency audit |

Typical local flow:

```bash
pnpm install
pnpm dev
```

Before opening a PR or merging:

```bash
pnpm type-check
pnpm lint:check
pnpm format:check
pnpm test:run
```

## Prisma

Initialize the Prisma schema and client (custom generated client path):

```bash
pnpm dlx prisma init --output ../generated/prisma
```

Or initialize with PostgreSQL as the datasource:

```bash
npx prisma init --datasource-provider postgresql
```

Create and apply your first migration (creates database tables from your
schema):

```bash
pnpm dlx prisma migrate dev --name init
```

## Commits

This project follows [Conventional Commits](https://www.conventionalcommits.org/).
