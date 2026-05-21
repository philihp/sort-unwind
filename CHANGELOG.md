# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Bumped dev dependencies: `typescript` 5.9.3 → 6.0.3, `typescript-eslint` 8.59.3 → 8.59.4, `ts-jest` 29.4.9 → 29.4.11.
- Added `ignoreDeprecations: "6.0"` to `tsconfig.json` to silence the `baseUrl` deprecation emitted by tsup's DTS build under TypeScript 6.

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

[Unreleased]: https://github.com/philihp/sort-unwind/compare/v3.1.0...HEAD
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
