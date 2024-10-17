import uuid from 'react-native-uuid';

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
    const newCalculator = {
      id: uuid.v4() as string,
      name: `Calculator ${this.calculators.length}`,
      model: new CalculatorViewModel(),
    };
    // const newCalculator = new CalculatorViewModel();
    
    this.calculators = [...this.calculators, newCalculator];

    return newCalculator;
  }

  removeCalculator(removeId: string) {
    this.calculators = this.calculators.filter(({ id }) => id !== removeId);
  }

  renameCalculator(renameId: string, name: string) {
    const calculator = this.calculators.find(({ id }) => id === renameId);

    if (calculator) calculator.name = name;
  }

  update() {
    this.calculators = [...this.calculators];
  }
}
