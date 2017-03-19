import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RuleListItem } from './rule-list-item';
import 'rxjs/add/operator/toPromise';
import { Limit } from 'app/limit';

@Injectable()
export class RuleListService {
  private baseUrl = 'assets/rules';
  private ruleList: RuleListItem[] = null;
  private ruleCache: { [key: string]: Limit } = {};

  constructor(private http: Http) { }

  ignoreSlash(name: string): string {
    return name.replace(/\//g, '');
  }

  getIndex(): Promise<RuleListItem[]> {
    if (this.ruleList) {
      return Promise.resolve(this.ruleList);
    }
    return this.http.get(`${this.baseUrl}/index.json`)
      .toPromise()
      .then(this.extractJson)
      .then((data) => {
        this.ruleList = data;
        return data;
      })
      .catch(this.handleError);
  }

  getRule(name: string): Promise<Limit> {
    name = this.ignoreSlash(name);
    if (name in this.ruleCache) {
      return Promise.resolve(this.ruleCache[name]);
    }
    return this.http.get(`${this.baseUrl}/${name}.json`)
      .toPromise()
      .then(this.extractJson)
      .then((data) => {
        this.ruleCache[name] = data;
        return data;
      })
      .catch(this.handleError);
  }

  private extractJson(res: Response): any {
    return res.json();
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
