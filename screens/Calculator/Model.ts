import { makeAutoObservable } from 'mobx';

export default class CalculatorModel {
  input = '';
  
  constructor() {
    makeAutoObservable(this);
  }
}
