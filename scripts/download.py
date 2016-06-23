# coding: UTF-8
import argparse
import os
import lxml.html
import re
import urllib.parse
import time
import requests
import rule_parser


def ignore_slash(s):
    return re.sub('/', '', s)


def make_filename(rule):
    outdir = 'pukiwiki'
    if not os.path.isdir(outdir):
        os.mkdir(outdir)
    return os.path.join(outdir, ignore_slash(rule.name) + '.pukiwiki')


def download(show_url):
    o = urllib.parse.urlparse(show_url)
    edit_url = 'http://yugioh-wiki.net/index.php?cmd=edit&page={}'.format(o.query)
    print(edit_url)
    response = requests.get(edit_url)
    root = lxml.html.fromstring(response.content)
    text = root.xpath('//textarea[@name="msg"]')[0].text
    time.sleep(2)
    return text


def save(filename, content):
    with open(filename, 'w', encoding='UTF-8') as f:
        f.write(content)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--rules', nargs='*')
    args = parser.parse_args()
    if args.rules:
        args.rules = list(map(ignore_slash, args.rules))

    for rule in rule_parser.run():
        filename = make_filename(rule)
        if args.rules:
            if ignore_slash(rule.name) in args.rules:
                content = download(rule.url)
                save(filename, content)
        else:
            content = download(rule.url)
            save(filename, content)

if __name__ == '__main__':
    main()
