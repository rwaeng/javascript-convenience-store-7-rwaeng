import { Console } from '@woowacourse/mission-utils';
import { readFileSync } from 'fs';
import { INPUT } from '../constants';

const regExp = /^\[(.+)-(\d+)\]$/;

const InputView = {
  readFile(fileName) {
    const data = readFileSync(fileName, 'utf-8')
      .split('\r\n')
      .map(it => it.trim());

    return data.slice(1, data.length - 1);
  },
  
  async getProducts() {
    const productsWithAmount = await Console.readLineAsync(INPUT.GET_PRODUCTS);

    return productsWithAmount
      .split(',')
      .map(item => item.match(regExp))
      .reduce((acc, [, name, quantity]) => {
        acc[name] = Number(quantity);
        return acc;
      }, {});
  },
};

export default InputView;
