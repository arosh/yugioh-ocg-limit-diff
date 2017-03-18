const fs = require('fs')
const yaml = require('js-yaml')
const path = require('path')
const cheerio = require('cheerio')

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

function parse (rule) {
  const filename = makeFilename(rule)
  return new Promise((resolve, reject) => {
    const options = { encoding: 'UTF-8' }
    fs.readFile(filename, options, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  }).then((data) => {
    const $ = cheerio.load(data)
    return $('textarea[name="msg"]').text()
  }).then((data) => {
    const zero = []
    const one = []
    const two = []
    const three = []
    let currentType = null
    // 行末に謎の全角スペースが入っていることもある
    const regexpCardName = /^-(?:'{2,3})?\[\[《(.+)》\]\](?:'{2,3})?/
    for (const line of data.split('\n')) {
      if (line.startsWith('**[[禁止カード]]')) {
        currentType = zero
      }
      if (line.startsWith('**[[制限カード]]')) {
        currentType = one
      }
      if (line.startsWith('**[[準制限カード]]')) {
        currentType = two
      }
      if (line.startsWith('**[[制限解除]]')) {
        currentType = three
      }
      if (currentType != null) {
        const m = line.match(regexpCardName)
        if (m) {
          let cardName = m[1]
          if (cardName === 'Reborn Tengu》>《輪廻天狗') {
            cardName = '輪廻天狗'
          }
          if (cardName.includes('《') || cardName.includes('》')) {
            console.log(filename)
            console.log(cardName)
          }
          // cardName = cardName.replace(/－/g, '−')
          currentType.push(cardName)
        }
      }
    }
    return {zero, one, two}
  }, (err) => {
    console.error(`Error: ${err}`)
  })
}

const rules = yaml.safeLoad(fs.readFileSync('script/rules.yaml'))
fs.writeFile('src/assets/rules.json', JSON.stringify(rules), {encoding: 'UTF-8'})

for (const rule of rules) {
  parse(rule).then((data) => {
    const filename = `src/assets/limits/${ignoreSlash(rule.name)}.json`
    fs.writeFile(filename, JSON.stringify(data), {encoding: 'UTF-8'})
  })
}
