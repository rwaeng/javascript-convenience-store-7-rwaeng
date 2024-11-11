import { DateTimes } from '@woowacourse/mission-utils';
import Promotion from '../domain/Promotion.js';
import InputView from '../view/InputView.js';

const PromotionController = {
  async initPromotion() {
    const promotionData = await InputView.readFile('public/promotions.md');
    return new Promotion(promotionData);
  },

  isValidPromotion(promotion, promotionInfo) {
    return promotion.isAvailable(promotionInfo, DateTimes.now());
  },

  countAvailablePromotionProduct(stockQ, buy, get) {
    return Math.floor(stockQ / (buy + get));
  },

  isAvailableMoreProduct(quantity, buy, get) {
    const remainder = quantity % (buy + get);
    if (remainder !== 0 && remainder === buy) {
      if (Math.floor(quantity / (buy + get)) === 0) {
        return get * 1;
      }
      return get * Math.floor(quantity / (buy + get));
    }
    return false;
  },
};

export default PromotionController;
