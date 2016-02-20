# coding: UTF-8
import json
import rule_parser
import limit_parser

def main():
    o = {}

    o['rules'] = []
    for rule in rule_parser.run():
        o['rules'].append({'name': rule.name, 'url': rule.url})

    o['limits'] = {}
    for limit in limit_parser.run():
        o['limits'].setdefault(limit.rule_name, {})
        o['limits'][limit.rule_name].setdefault(limit.type, [])
        o['limits'][limit.rule_name][limit.type].append(limit.card_name)

    with open('regulation.json', 'w', encoding='UTF-8') as f:
        json.dump(o, f)


if __name__ == '__main__':
    main()
