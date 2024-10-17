import { makeAutoObservable } from 'mobx';

import CalculatorViewModel from '../Calculator/ViewModel';
import MainModel from './Model';

export default class MainViewModel {
  model = new MainModel();

  constructor() {
    makeAutoObservable(this);
  }

  get calculators() {
    return this.model.calculators;
  }

  set calculators(value) {
    this.model.calculators = value;
  }

  addCalculator() {
    const newCalculator = new CalculatorViewModel();

    this.calculators = [...this.calculators, newCalculator];

    return newCalculator;
  }

  removeCalculator(removeId: string) {
    this.calculators = this.calculators.filter(
      ({ model }) => model.id !== removeId,
    );
  }

  renameCalculator(renameId: string, name: string) {
    const calculator = this.calculators.find(
      ({ model }) => model.id === renameId,
    );

    if (calculator) calculator.model.name = name;
  }

  update() {
    this.calculators = [...this.calculators];
  }
}
