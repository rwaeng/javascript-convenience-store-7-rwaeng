import { Console } from '@woowacourse/mission-utils';
import { readFileSync } from 'fs';
import { REG_EXP } from '../constants.js';
import Validator from '../domain/Validator.js';
import { convertToObjects } from '../utils.js';

const InputView = {
  readFile(fileName) {
    const data = readFileSync(fileName, 'utf-8')
      .split('\r\n')
      .map(line => line.trim())
      .filter(line => line);

    return convertToObjects(data);
  },

  async getProducts(stock) {
    const productsWithAmount = await Console.readLineAsync('');
    Validator.validateInput(productsWithAmount);

    const products = productsWithAmount
      .split(',')
      .map(item => item.match(REG_EXP))
      .reduce((acc, [, name, quantity]) => {
        acc.push({ name: name, quantity: Number(quantity) });
        return acc;
      }, []);

    products.forEach(product => {
      try {
        Validator.validateCartItem(stock.getStock(), product);
      } catch (e) {
        throw e;
      }
    });

    return products;
  },

  async getYesNo() {
    const answer = await Console.readLineAsync('');
    Validator.validateYesNO(answer);

    return answer.toUpperCase();
  },
};

export default InputView;
