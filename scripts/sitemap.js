// @flow
import * as fs from 'mz/fs';
import * as yaml from 'js-yaml';
import ignoreSlash from './ignoreSlash';

async function run() {
  const baseUrl = 'https://yugioh-f05e3.firebaseapp.com/';
  const rules = yaml.safeLoad(await fs.readFile('scripts/rules.yaml', 'UTF-8'));
  const lines = [];
  for (const newRule of rules) {
    for (const oldRule of rules) {
      const newName = ignoreSlash(newRule.name);
      const oldName = ignoreSlash(oldRule.name);
      const url = `${baseUrl}?new=${newName}&old=${oldName}`;
      lines.push(url);
    }
  }
  const content = lines.join('\n');
  fs.writeFile('public/sitemap.txt', content, { encoding: 'UTF-8' });
}

run();
