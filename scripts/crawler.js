// @flow
// const fs = require('fs');
const fs = require('mz/fs');
const yaml = require('js-yaml');
const path = require('path');
const url = require('url');
const request = require('request');
const iconv = require('iconv-lite');

function ignoreSlash(s /*:string*/) /*:string*/ {
  return s.replace(/\//g, '');
}

function makeFilename(rule /*: { name: string }*/) {
  const outdir = 'script/pukiwiki';
  return path.format({
    dir: outdir,
    name: ignoreSlash(rule.name),
    ext: '.html',
  });
}

async function fetch(rule) {
  const filename = makeFilename(rule);
  let exists = false;
  try {
    await fs.access(filename, fs.constants.F_OK);
    exists = true;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
  if (exists) {
    const query /*:string*/ = url.parse(rule.url).query /*:any*/;
    const editUrl = `http://yugioh-wiki.net/index.php?cmd=edit&page=${query}`;
    new Promise((resolve, reject) => {
      request.get(editUrl, { encoding: null }, (err, resp, body) => {
        if (err) {
          reject(err);
          return;
        }
        console.info(`Get: ${rule.name}`);
        setTimeout(() => {
          resolve(body);
        }, 3000);
      });
    });
  }
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.F_OK, err => {
      if (err && err.code === 'ENOENT') {
        resolve();
        return;
      }
      reject(`Skip: ${rule.name}`);
    });
  })
    .then(() => {
      const query /*: string*/ = url.parse(rule.url).query /*: any*/;
      const editUrl = `http://yugioh-wiki.net/index.php?cmd=edit&page=${query}`;
      return new Promise((resolve, reject) => {
        request.get(editUrl, { encoding: null }, (err, resp, body) => {
          if (err) {
            reject(err);
            return;
          }
          console.info(`Get: ${rule.name}`);
          setTimeout(() => {
            resolve(body);
          }, 3000);
        });
      });
    })
    .then(
      body => {
        return new Promise((resolve, reject) => {
          const content = iconv.decode(new Buffer(body), 'EUC-JP');
          fs.writeFile(filename, content, err => {
            if (err) {
              reject(err);
              return;
            }
            console.info(`Save: ${rule.name}`);
            resolve();
          });
        });
      },
      err => {
        console.error(`Error: ${err}`);
      }
    );
}

async function run() {
  const rules = yaml.safeLoad(fs.readFileSync('scripts/rules.yaml'));
  for (const rule of rules) {
    await fetch(rule);
  }
}
run();
