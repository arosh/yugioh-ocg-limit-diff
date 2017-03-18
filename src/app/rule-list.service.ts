import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RuleListItem } from './rule-list-item';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RuleListService {
  private url = 'assets/rules/index.json';
  private ruleList: RuleListItem[] = null;

  constructor(private http: Http) { }

  getIndex(): Promise<RuleListItem[]> {
    if (this.ruleList) {
      return Promise.resolve(this.ruleList);
    }
    return this.http.get(this.url)
      .toPromise()
      .then(this.extractData)
      .then((data) => {
        this.ruleList = data;
        return data;
      })
      .catch(this.handleError);
  }

  private extractData(res: Response): RuleListItem[] {
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
