// @flow
import * as fs from 'mz/fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as url from 'url';
import * as request from 'request';
import * as iconv from 'iconv-lite';

function ignoreSlash(s: string): string {
  return s.replace(/\//g, '');
}

function makeFilename(rule: { name: string }) {
  const outdir = 'scripts/pukiwiki';
  return path.format({
    dir: outdir,
    name: ignoreSlash(rule.name),
    ext: '.html',
  });
}

function waitFor(milliSecond): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, milliSecond);
  });
}

async function fetch(rule: { name: string, url: string }) {
  const filename = makeFilename(rule);
  let exists = false;
  try {
    await fs.access(filename, fs.constants.F_OK);
    console.log(`Skip: ${rule.name}`);
    exists = true;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
  if (!exists) {
    const query: string = (url.parse(rule.url).query: any);
    const editUrl = `http://yugioh-wiki.net/index.php?cmd=edit&page=${query}`;
    const body = await new Promise((resolve, reject) => {
      request.get(editUrl, { encoding: null }, (err, resp, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      });
    });
    console.info(`Get: ${rule.name}`);
    const content = iconv.decode(new Buffer(body), 'EUC-JP');
    await fs.writeFile(filename, content);
    console.info(`Save: ${rule.name}`);
    await waitFor(2000);
  }
}

async function run() {
  const rules = yaml.safeLoad(fs.readFileSync('scripts/rules.yaml'));
  for (const rule of rules) {
    await fetch(rule);
  }
}
run();
