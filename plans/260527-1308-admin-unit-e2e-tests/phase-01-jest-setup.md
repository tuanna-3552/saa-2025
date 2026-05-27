# Phase 01: Jest + RTL Setup

**Status:** completed

## Dependencies to install (admin package)

```
jest jest-environment-jsdom @swc/jest @swc/core
@testing-library/react @testing-library/jest-dom @testing-library/user-event
@types/jest
```

## Files to create

- `front-end/admin/jest.config.ts`
- `front-end/admin/jest.setup.ts`
- `front-end/admin/tsconfig.test.json` (extends base, includes test files)

## Files to modify

- `front-end/admin/package.json` — add `test` script: `"test": "jest --coverage"`

## jest.config.ts key config

```ts
testEnvironment: 'jsdom',
transform: { '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }] },
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
  '@saa/shared-ui': '<rootDir>/../../front-end/shared-ui/src/index.ts',
  '\\.(css|scss)$': '<identity-obj-proxy>',
},
setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
transformIgnorePatterns: ['node_modules/(?!(@saa/shared-ui)/)'],
```

## jest.setup.ts

```ts
import '@testing-library/jest-dom';
```

## tsconfig.test.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "module": "CommonJS", "moduleResolution": "node" },
  "include": ["src/**/*.ts", "src/**/*.tsx", "jest.setup.ts"]
}
```
