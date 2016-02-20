# coding: UTF-8
import re
import os
import glob
import collections

Limit = collections.namedtuple('Limit', 'type rule_name card_name')


def get_root_in_basename(fpath):
    return os.path.splitext(os.path.basename(fpath))[0]


def extract(rule_name, lines):
    e = []
    typ = None
    for line in lines:
        if re.search(r'\*\*(?:\[\[)?禁止カード(?:\]\])?', line):
            assert typ == None
            typ = 'forbidden'
        if re.search(r'\*\*\[\[制限カード\]\]', line):
            assert typ == 'forbidden'
            typ = 'one'
        if re.search(r'\*\*\[\[準制限カード\]\]', line):
            assert typ == 'one'
            typ = 'two'
        if re.search(r'\*\*(?:\[\[)?制限解除(?:\]\])?', line):
            assert typ == 'two'
            typ = None
        if typ in ['forbidden', 'one', 'two']:
            m = re.match(r"-(?:'''?)?\[\[《(.+)》\]\](?:'''?)?", line)
            if m:
                card_name = m.group(1)
                if card_name == 'Reborn Tengu》>《輪廻天狗':
                    card_name = '輪廻天狗'
                if '《' in card_name or '》' in card_name:
                    print(card_name)
                e.append(Limit(typ, rule_name, card_name))
    assert typ == None
    return e


def run():
    for fname in glob.glob('pukiwiki/*.pukiwiki'):
        with open(fname, encoding='UTF-8') as f:
            lines = []
            for line in f:
                lines.append(line)
            name = get_root_in_basename(fname)
            limits = extract(name, lines)
            for limit in limits:
                yield limit


def main():
    for limit in run():
        print(limit)

if __name__ == '__main__':
    main()
