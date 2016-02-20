# coding: UTF-8
import os
import lxml.html
import collections
import recordclass

Rule = collections.namedtuple('Rule', 'name url')


def run():
    filename = 'resources/rules.html'
    with open(filename, encoding='UTF-8') as f:
        doc = lxml.html.fromstring(f.read())
    for a_tag in doc.xpath('//a'):
        yield Rule(a_tag.text_content(), a_tag.attrib['href'])


def main():
    for rule in run():
        print(rule)

if __name__ == '__main__':
    main()
