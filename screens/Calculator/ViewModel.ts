import { makeAutoObservable } from 'mobx';

import CalculatorModel from './Model';

export default class CalculatorViewModel {
  model = new CalculatorModel();

  constructor() {
    makeAutoObservable(this);
  }

  get input() {
    return this.model.input;
  }

  set input(value) {
    this.model.input = value;
  }

  appendInput(value: string) {
    this.input += value;
  }
}
