import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const konfiguration = [
  { ignores: ['.next/**', 'node_modules/**', 'vorschlaege/**', 'design_handoff_tenverde_website/**', 'tools/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default konfiguration;
