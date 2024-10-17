import { makeAutoObservable } from 'mobx';

export default class MainModel {
  calculators: Calculator[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
