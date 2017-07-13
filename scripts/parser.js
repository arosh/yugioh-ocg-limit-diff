// @flow
import * as yaml from 'js-yaml';
import * as cheerio from 'cheerio';
import * as fs from 'mz/fs';
import * as path from 'path';
import ignoreSlash from './ignoreSlash';

function makeFilename(rule: { name: string }) {
  const outdir = 'scripts/pukiwiki';
  return path.format({
    dir: outdir,
    name: ignoreSlash(rule.name),
    ext: '.html',
  });
}

async function parse(rule: { name: string, url: string }) {
  const filename = makeFilename(rule);
  const data: string = await fs.readFile(filename, 'UTF-8');
  const $ = cheerio.load(data);
  const text = $('textarea[name="msg"]').text();
  const zero = [];
  const one = [];
  const two = [];
  const three = [];
  let currentType = null;
  // 行末に謎の全角スペースが入っていることもある
  const regexpCardName = /^-(?:'{2,3})?\[\[《(.+)》\]\](?:'{2,3})?/;
  for (const line of text.split('\n')) {
    if (line.startsWith('**[[禁止カード]]')) {
      currentType = zero;
    }
    if (line.startsWith('**[[制限カード]]')) {
      currentType = one;
    }
    if (line.startsWith('**[[準制限カード]]')) {
      currentType = two;
    }
    if (line.startsWith('**[[制限解除]]')) {
      currentType = three;
    }
    if (currentType != null) {
      const m = line.match(regexpCardName);
      if (m) {
        let cardName = m[1];
        if (cardName === 'Reborn Tengu》>《輪廻天狗') {
          cardName = '輪廻天狗';
        }
        if (cardName.includes('《') || cardName.includes('》')) {
          console.log(filename);
          console.log(cardName);
        }
        // cardName = cardName.replace(/－/g, '−')
        currentType.push(cardName);
      }
    }
  }
  return { zero, one, two };
}

async function run() {
  const options = { encoding: 'UTF-8' };
  const rules = yaml.safeLoad(await fs.readFile('scripts/rules.yaml', 'UTF-8'));
  fs.writeFile('src/resources/index.json', JSON.stringify(rules), options);
  for (const rule of rules) {
    const data = await parse(rule);
    const filename = `src/resources/${ignoreSlash(rule.name)}.json`;
    fs.writeFile(filename, JSON.stringify(data), options);
  }
}

run();
