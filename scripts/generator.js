// @flow
import * as fs from 'mz/fs';
import * as yaml from 'js-yaml';
import ignoreSlash from './ignoreSlash';

async function run() {
  const rules = yaml.safeLoad(await fs.readFile('scripts/rules.yaml', 'UTF-8'));
  console.log(`switch (canonicalName) {`);
  for (const rule of rules) {
    const canonicalName = ignoreSlash(rule.name);
    console.log(`  case '${canonicalName}':`);
    console.log(
      `    return await import('../resources/${canonicalName}.json');`
    );
  }
  console.log(`  default:`);
  console.log(`    throw new Error('canonicalName = ' + canonicalName);`);
  console.log(`}`);
}

run();
