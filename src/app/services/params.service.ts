import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Params } from '../models/params';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  private params: Params = new Params();

  private states = {
    page: 0,
    size: 0,
    total: 0,
    pages: 0,
    hasnext: false,
    hasprevious: false
  };

  constructor() { }

  public get currentParams() {
    return this.states;
  }

  setParams(params: any): void {
    this.states = params;
  }

  next(subject: BehaviorSubject<Params>): void {
    if (!this.currentParams.hasnext) {
      return;
    }

    this.params.page += 1;
    subject.next(this.params);
  }

  previous(subject: BehaviorSubject<Params>): void {
    if (!this.currentParams.hasprevious) {
      return;
    }

    this.params.page -= 1;
    subject.next(this.params);
  }

  search(keyword: string, subject: BehaviorSubject<Params>): void {
    this.params.page = 1;
    this.params.keyword = keyword;
    subject.next(this.params);
  }

  refresh(subject: BehaviorSubject<Params>): void {
    subject.next(this.params);
  }

  setSize(size: number, subject: BehaviorSubject<Params>): void {
    this.params.size = size;
    subject.next(this.params);
  }
}
