# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.1.1] - 2026-10-29

The runtime code is the same as in 4.1.0. `dist/index.js` and `dist/index.cjs` are byte-identical to 4.1.0. The type declarations have a different form, but the types are the same. All other changes are to the toolchain, the tests, and the docs.

### Performance

The speed does not change from 4.1.0. If you upgrade from 3.1.0, `unwind` is faster on large arrays and a little slower on very small arrays. This change came in 4.1.0.

Median time for one `unwind` call:

| Array length |   3.1.0 |   4.1.0 |   4.1.1 | 4.1.1 compared to 3.1.0 |
| -----------: | ------: | ------: | ------: | ----------------------- |
|           10 | 0.53 µs | 0.63 µs | 0.62 µs | 17% slower              |
|        1,000 |  143 µs |  145 µs |  143 µs | the same                |
|      100,000 | 33.8 ms | 27.6 ms | 27.4 ms | 1.23× faster            |
|    1,000,000 |  864 ms |  436 ms |  441 ms | 1.96× faster            |

Each value is the median of 5 runs on Node 26.13.0 in a 4-CPU Linux container. The ranks and values are shuffled with a fixed seed. At 1,000,000 items, the 3.1.0 times changed from 538 ms to 930 ms between runs. The 4.1.0 and 4.1.1 times changed by less than 8%.

### Changed

- Upgraded `typescript` to 7. TypeScript 7 does not ship the JS compiler API, so `oxlint` replaces `eslint` and `typescript-eslint`, and `tsc` now emits the declaration files instead of tsup.
- Bumped dev dependencies: `tsup` 8.5.1 → 9.0.0, `fast-shuffle` 6.2.0 → 7.0.0, `@types/node` 25 → 26.
- Bumped `.node-version` to 26.13.0. The coverage workflow now reads `.node-version` instead of a fixed Node 24.
- Removed the `--experimental-strip-types` flag from the test scripts. Running the tests now needs Node 22.18 or later.
- Removed from `.oxlintrc.json` the rules that its `correctness` and `suspicious` categories already enable. The set of enabled rules does not change.
- `allowScripts` in `package.json` denies the esbuild postinstall script. The build does not need it.
- The tests use a seeded shuffle, so each run gives the same result.
- Pinned the Coveralls action to `v2` instead of `master`, and set read-only token permissions in the tests workflow.
- The publish workflow uses the npm that Node 26 bundles, instead of installing `npm@latest`.

## [4.1.0] - 2026-07-05

### Changed

- `unwind` now sorts the indices of the source array by rank and maps them over the source. The output does not change.
- The publish workflow uses npm trusted publishing (OIDC) instead of an `NPM_TOKEN` secret. You can also start it manually.
- Rewrote the package description, keywords, and README, and added a `funding` field.

### Added

- Tests for duplicate values, for stable sorting of duplicate ranks, and that `unwind` does not change its inputs.

## [4.0.0] - 2026-06-11

### Removed

- **Breaking:** Removed the deprecated default export. Use the named import instead: `import { unwind } from 'sort-unwind'`.

### Changed

- **Breaking:** Dropped support for Node 18 and 20 (both end-of-life); `engines` now requires Node >= 22.
- Replaced jest with the built-in `node:test` runner, removing `jest`, `ts-jest`, `@types/jest`, and `eslint-plugin-jest`.
- Simplified the eslint, tsconfig, tsup, and lint-staged configuration; added top-level `module`/`types` fields to `package.json`.
- Bumped dev dependencies: `typescript` 5.9.3 → 6.0.3, `typescript-eslint` 8.59.3 → 8.59.4.
- Added `ignoreDeprecations: "6.0"` to `tsconfig.json` to silence the `baseUrl` deprecation emitted by tsup's DTS build under TypeScript 6.
- CI now tests on Node 22, 24, and 26.

### Added

- Release workflow that stages an npm publish (`npm stage publish`) when a GitHub release is published.

### Fixed

- Added missing `@eslint/js` devDependency, which is imported by `eslint.config.js`.
- Reordered `package.json` `exports` to put `types` first (per-format) so it isn't shadowed by `import`/`require`. Eliminates the esbuild "condition will never be used" warning during `tsup` builds and routes CJS consumers to `dist/index.d.cts`.

## [3.1.0] - 2024-07-20

### Changed

- Renamed the default export and kept the old name as a deprecated alias.
- Updated build to target Node 22.4 and produce both CJS and ESM outputs.

## [3.0.1] - 2024-07-05

### Added

- `exports` field in `package.json` so the package resolves correctly under modern bundlers.

## [3.0.0] - 2024-07-05

### Changed

- **Breaking:** Migrated to ESLint 9 flat config and bumped `typescript-eslint` to the v8 line.
- Switched local Node version management to nodenv and refreshed the supported Node matrix.
- Removed `lint-staged` from the published package.

### Added

- OpenSSF Scorecard workflow (`scorecard.yml`).
- Explicit `eslint-plugin-jest` and `eslint-plugin-prettier` dependencies.

## [2.1.2] - 2023-04-18

### Changed

- Documentation/badge tweaks only.

## [2.1.1] - 2023-04-18

### Changed

- Documentation/badge tweaks only.

## [2.1.0] - 2023-04-18

### Changed

- Bulk dependency refresh.

## [2.0.0] - 2022-08-31

### Changed

- **Breaking:** Rewrote the library in TypeScript.
- Dropped support for Node 10, 11, 12, and 13; added Node 16 support.
- Updated configuration for Husky 7.

## [1.0.0] - 2021-03-10

### Changed

- Imported only the parts of Ramda actually used, reducing bundle size.
- Marked the package as side-effect free.
- Adopted Renovate for automated dependency updates.

## [0.0.2] - 2021-03-08

### Changed

- README badge updates.

## [0.0.1] - 2021-03-08

### Added

- Initial release.

[Unreleased]: https://github.com/philihp/sort-unwind/compare/v4.1.1...HEAD
[4.1.1]: https://github.com/philihp/sort-unwind/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/philihp/sort-unwind/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/philihp/sort-unwind/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/philihp/sort-unwind/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/philihp/sort-unwind/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/philihp/sort-unwind/compare/v2.1.2...v3.0.0
[2.1.2]: https://github.com/philihp/sort-unwind/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/philihp/sort-unwind/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/philihp/sort-unwind/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/philihp/sort-unwind/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/philihp/sort-unwind/compare/v0.0.2...v1.0.0
[0.0.2]: https://github.com/philihp/sort-unwind/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/philihp/sort-unwind/releases/tag/v0.0.1
