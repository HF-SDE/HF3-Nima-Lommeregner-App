import { makeAutoObservable, makeObservable } from 'mobx';

import CalculatorViewModel from '../Calculator/ViewModel';

export default class MainModel {
  calculators: CalculatorViewModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
