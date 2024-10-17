import uuid from 'react-native-uuid';

import { makeAutoObservable } from 'mobx';

export default class CalculatorModel {
  id = '';
  name = 'New Calculator';
  input = '0';
  history: string[] = [];

  constructor() {
    makeAutoObservable(this);

    this.id = uuid.v4() as string;
  }
}
