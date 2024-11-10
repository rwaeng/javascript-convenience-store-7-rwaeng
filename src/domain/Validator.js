import { ERROR, REG_EXP } from '../constants.js';

const Validator = {
  validateIsNull(input) {
    if (!input) throw new Error(ERROR.INPUT.WRONG);
  },

  validateInputFormat(input) {
    if (!REG_EXP.test(input)) throw new Error(ERROR.INPUT.INVALID_FORMAT);
  },

  validateInput(input) {
    this.validateIsNull(input);
    this.validateInputFormat(input.split(','));
  },

  validateYesNO(input) {
    const upperCase = input.toUpperCase();
    if (upperCase !== 'Y' && upperCase !== 'N')
      throw new Error(ERROR.INPUT.WRONG);
  },

  validateExistProductName(stock, product) {
    if (!stock.some(item => item.name === product.name)) {
      throw new Error(ERROR.STOCK.INVALID_PRODUCT);
    }
  },

  validateUnderQuantity(product) {
    if (product.quantity < 0) throw new Error(ERROR.STOCK.UNDER_QUANTITY);
  },

  validateOverQuantity(stock, product) {
    const totalQuantity = stock
      .filter(item => item.name === product.name)
      .reduce((sum, item) => sum + item.quantity, 0);

    if (product.quantity > totalQuantity) {
      throw new Error(ERROR.STOCK.OVER_QUANTITY);
    }
  },

  validateCartItem(stock, product) {
    this.validateExistProductName(stock, product);
    this.validateUnderQuantity(product);
    this.validateOverQuantity(stock, product);
  },
};

export default Validator;
