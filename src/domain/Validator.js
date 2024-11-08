import { ERROR, REG_EXP } from '../constants';

const Validator = {
  validateIsNull(input) {
    if (!input) throw new Error(ERROR.INPUT.WRONG);
  },
  validateInputFormat(input) {
    if(!REG_EXP.test(input)) throw new Error(ERROR.INPUT.INVALID_FORMAT);
  }
};

export default Validator;
