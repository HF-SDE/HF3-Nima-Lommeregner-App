import * as Clipboard from 'expo-clipboard';

import { main } from '@/stores/main';
import { makeAutoObservable } from 'mobx';
import { toast } from 'sonner-native';

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
    if (value === '' || value === undefined || value == '00') {
      this.model.input = '0';
      this.model.history.push('0');
      main.update();

      return;
    }

    this.model.input = value.replace(/^0+(?!\.)/, '');

    this.model.history.push(value);

    main.update();
  }

  get strList() {
    return this.input.split(/([+\-*/])/);
  }

  get prevChar() {
    const str = this.input;

    return str[str.length - 1];
  }

  appendInput(value: string | number, isOperator = false) {
    if (isOperator) {
      if (!this.input || this.input == '0') return;

      this.input = this.input.replace(/[-+*/]$/, ''); // if last character is operator
    } else if (this.input.length >= 13) return;

    if (value == '.') {
      if (this.strList[this.strList.length - 1].includes('.')) return;

      if (isNaN(Number(this.prevChar))) value = '0.';
    }

    this.input += value;
  }

  clear() {
    this.input = '';
  }

  delete() {
    this.input = this.input?.slice(0, -1);
  }

  evaluate() {
    var str = this.input.replace(/[^-()\d/*+.]/g, '').replace(/[-+*/]$/, '');

    const strList = str.split(/([+\-*/])/);

    if (strList.length < 2) return '';

    const result = eval(str);

    return result;
  }

  finalEvaluate() {
    const result = this.evaluate();

    if (result == 69 || result == 80085) {
      toast('Nice');
    }

    if (result === '') {
      toast.error('Invalid input');
      return;
    }

    this.input = result.toString();
  }

  copy() {
    Clipboard.setStringAsync(this.input);
    toast(`Copied '${this.input}' to clipboard`);
  }

  undo() {
    if (this.model.history.length < 1) return;

    this.model.history.pop();
    this.input = this.model.history[this.model.history.length - 1];
    this.model.history.pop();
  }
}
