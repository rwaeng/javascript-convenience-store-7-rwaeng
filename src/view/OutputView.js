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

  askToAddFreeProducts(productName, quantity) {
    Console.print(
      `현재 ${productName}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
    );
  },

  askToPayFullPrice(productName, quantity) {
    `현재 ${productName} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`;
  },
};

export default OutputView;
