# coding: UTF-8
from __future__ import absolute_import, division, print_function, unicode_literals
import sqlite3

def main():
    conn = sqlite3.connect('db.sqlite3')
    with conn:
        conn.execute('''CREATE TABLE rules(
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            url TEXT)''')
        conn.execute('''CREATE TABLE cards(
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            url TEXT)''')
        conn.execute('''CREATE TABLE limitations(
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            type TEXT,
                            rule_id INTEGER,
                            card_id INTEGER,
                            FOREIGN KEY(rule_id) REFERENCES rules(id),
                            FOREIGN KEY(card_id) REFERENCES cards(id))''')

if __name__ == '__main__':
    main()
