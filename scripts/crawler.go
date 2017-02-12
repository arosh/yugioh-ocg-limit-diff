package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v2"
)

type Rule struct {
	Name string
	Url  string
}

func loadConfig(name string) ([]Rule, error) {
	data, err := ioutil.ReadFile(name)
	if err != nil {
		return nil, err
	}
	rs := []Rule{}
	err = yaml.Unmarshal(data, &rs)
	if err != nil {
		return nil, err
	}
	return rs, nil
}

func ignoreSlash(s string) string {
	return strings.Replace(s, "/", "", -1)
}

func makeFilename(r Rule) string {
	outdir := "pukiwiki"
	return filepath.Join(outdir, ignoreSlash(r.Name)+".html")
}

func fetch(r Rule) error {
	filename := makeFilename(r)
	if _, err := os.Stat(filename); err == nil {
		log.Printf("Skip: %s", filename)
		return nil
	}
	resp, err := http.Get(r.Url)
	if err != nil {
		return err
	}
	// ``Caller should close resp.Body''
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("resp.Status = %s", resp.Status)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(filename, body, 0644)
	if err != nil {
		return err
	}
	log.Printf("Fetch: %s", r.Name)
	return nil
}

func main() {
	rs, err := loadConfig("scripts/rules.yaml")
	if err != nil {
		log.Fatal(err)
	}
	for _, r := range rs {
		if err := fetch(r); err != nil {
			log.Fatal(err)
		}
	}
}
