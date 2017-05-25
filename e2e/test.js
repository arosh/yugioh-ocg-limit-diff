// @flow
import test from 'ava';
import * as webdriverio from 'webdriverio';

class Page {
  /*::
  browser: any;
  */
  constructor(browser) {
    this.browser = browser;
  }
  async setNewRule(visibleText) {
    let selector = '#select-newRule';
    await this.browser.selectByVisibleText(selector, visibleText);
  }
  async setOldRule(visibleText) {
    let selector = '#select-oldRule';
    await this.browser.selectByVisibleText(selector, visibleText);
  }
}

const browser = webdriverio.remote({
  desiredCapabilities: { browserName: 'chrome' },
});

test.before(async t => {
  await browser.init().url('http://localhost:3000');
});

test.after.always(async t => {
  await browser.end();
});

test(async t => {
  t.is(await browser.getTitle(), '遊戯王 禁止制限比較');
});

test(async t => {
  const selector = '#link-newRule';
  const text = await browser.getText(selector);
  t.is(text, '2017/04/01');
  const href = await browser.getAttribute(selector, 'href');
  const url =
    'http://yugioh-wiki.net/index.php?%A5%EA%A5%DF%A5%C3%A5%C8%A5%EC%A5%AE%A5%E5%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3%2F2017%C7%AF4%B7%EE1%C6%FC';
  t.is(href, url);
});

test(async t => {
  const selector = '#link-oldRule';
  const text = await browser.getText(selector);
  t.is(text, '2017/01/01');
  const href = await browser.getAttribute(selector, 'href');
  const url =
    'http://yugioh-wiki.net/index.php?%A5%EA%A5%DF%A5%C3%A5%C8%A5%EC%A5%AE%A5%E5%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3%2F2017%C7%AF1%B7%EE1%C6%FC';
  t.is(href, url);
});

test(async t => {
  const page = new Page(browser);
  await page.setNewRule('2016/10/01');
  const selector = '#link-newRule';
  const text = await browser.getText(selector);
  t.is(text, '2016/10/01');
  const href = await browser.getAttribute(selector, 'href');
  const url =
    'http://yugioh-wiki.net/index.php?%A5%EA%A5%DF%A5%C3%A5%C8%A5%EC%A5%AE%A5%E5%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3%2F2016%C7%AF10%B7%EE1%C6%FC';
  t.is(href, url);
});

test(async t => {
  const page = new Page(browser);
  await page.setNewRule('2017/01/01');
  await page.setOldRule('2016/10/01');
  const selector = '#react-root div.panel.panel-danger ul';
  t.true(await browser.element(selector).isExisting('li*=マジェスペクター・ユニコーン'));
});
