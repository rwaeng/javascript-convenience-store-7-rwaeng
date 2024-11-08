import { Console } from '@woowacourse/mission-utils';
import { OUTPUT } from '../constants';

const OutputView = {
  printWelcome(productList) {
    Console.print(OUTPUT.WELCOME);

    this.printProducts(productList);

    Console.print(OUTPUT.GET_PRODUCTS);
  },

  // 타입 정리 inputView에서 필요
  printProducts(productList) {
    productList.map(({ name, price, quantity, promotion }) => {
      let count = `${quantity}개`;
      if (!Number(quantity)) count = '재고 없음';

      let promo = promotion;
      if (promo === 'null') promo = '';

      Console.print(
        `- ${name} ${Number(price).toLocaleString('ko-KR')}원 ${count} ${promo}`,
      );
    });
  },
};

export default OutputView;
