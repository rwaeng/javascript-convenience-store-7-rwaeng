import { ERROR, REG_EXP } from '../constants';

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
};

export default Validator;
