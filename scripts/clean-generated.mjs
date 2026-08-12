// Removes src/generated before orval writes it again.
//
// orval only ever creates and overwrites; it never deletes. Because src/generated is
// committed, every schema that gets renamed upstream leaves its old file behind, and
// index.ts keeps exporting it — the published SDK then carries types for shapes that
// no longer exist in any service. Half of this directory had become that.
//
// It also breaks the build outright when a rename only changes letter case: two
// releases in a row produced IPv6ResponseBody and Ipv6ResponseBody, whose files differ
// only in casing, and TypeScript refuses to have both in one program (TS1149).
//
// Regenerating from scratch is cheap here — the inputs are four YAML files.
import { rmSync } from 'node:fs';

const TARGET = './src/generated';

rmSync(TARGET, { recursive: true, force: true });
console.log(`cleaned ${TARGET}`);
