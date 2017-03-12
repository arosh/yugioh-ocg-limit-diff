const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function ignoreSlash(s) {
  return s.replace('/', '');
}

function makeFilename(rule) {
  const outdir = 'pukiwiki';
  return path.format({
    dir: outdir,
    name: ignoreSlash(rule.name),
    ext: 'html',
  });
}

function fetch(rule) {

}

const rules = yaml.safeLoad(fs.readFileSync('scripts/rules.yaml'));
for (const rule of rules) {

}
