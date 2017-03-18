const fs = require('fs')
const yaml = require('js-yaml')
const path = require('path')
const url = require('url')
const request = require('request')
const iconv = require('iconv-lite')

function ignoreSlash (s) {
  return s.replace(/\//g, '')
}

function makeFilename (rule) {
  const outdir = 'script/pukiwiki'
  return path.format({
    dir: outdir,
    name: ignoreSlash(rule.name),
    ext: '.html'
  })
}

function fetch (rule) {
  const filename = makeFilename(rule)
  return new Promise((resolve, reject) => {
    fs.access(filename, err => {
      if (err && err.code === 'ENOENT') {
        resolve()
        return
      }
      reject(`Skip: ${rule.name}`)
    })
  }).then(() => {
    const query = url.parse(rule.url).query
    const editUrl = `http://yugioh-wiki.net/index.php?cmd=edit&page=${query}`
    return new Promise((resolve, reject) => {
      request.get(editUrl, { encoding: null }, (err, resp, body) => {
        if (err) {
          reject(err)
          return
        }
        console.info(`Get: ${rule.name}`)
        setTimeout(() => {
          resolve(body)
        }, 3000)
      })
    })
  }).then((body) => {
    return new Promise((resolve, reject) => {
      const content = iconv.decode(new Buffer(body), 'EUC-JP')
      fs.writeFile(filename, content, (err) => {
        if (err) {
          reject(err)
          return
        }
        console.info(`Save: ${rule.name}`)
        resolve()
      })
    })
  }, (err) => {
    console.error(`Error: ${err}`)
  })
}

const rules = yaml.safeLoad(fs.readFileSync('script/rules.yaml'))
let promise = Promise.resolve()
for (const rule of rules) {
  promise = promise.then(() => fetch(rule))
}
