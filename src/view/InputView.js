import { Console } from '@woowacourse/mission-utils';
import { readFileSync } from 'fs';
import { REG_EXP } from '../constants';
import Validator from '../domain/Validator';

const InputView = {
  readFile(fileName) {
    const data = readFileSync(fileName, 'utf-8')
      .split('\r\n')
      .map(it => it.trim());

    return data.slice(1, data.length - 1);
  },

  async getProducts() {
    const productsWithAmount = await Console.readLineAsync();
    this.validateInput(productsWithAmount);

    return productsWithAmount
      .split(',')
      .map(item => item.match(REG_EXP))
      .reduce((acc, [, name, quantity]) => {
        acc[name] = Number(quantity);
        return acc;
      }, {});
  },

  async getYesNo() {
    const answer = await Console.readLineAsync();
    Validator.validateYesNO(answer);

    return answer.toUpperCase();
  },

  validateInput(input) {
    Validator.validateIsNull(input);
    Validator.validateInputFormat(input.split(','));
  },
};

export default InputView;
