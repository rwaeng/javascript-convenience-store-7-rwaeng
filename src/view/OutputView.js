import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMessage(message) {
    Console.print(message);
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
    Console.print(
      `현재 ${productName} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
    );
  },

  printReceipt(cart, stock, membership) {
    OutputView.printMessage('======편의점=======');
    OutputView.printMessage('상품명 수량 금액');
    const { totalCount, sum } = this.printRegularItems(cart, stock);
    OutputView.printMessage('=======증정=======');
    const { promotionCount, promotionSum } = this.printPromotionItems(
      cart,
      stock,
    );
    OutputView.printMessage('==================');
    this.printFinalAmount(totalCount, sum, promotionSum, membership);
  },

  printRegularItems(cart, stock) {
    let totalCount = 0;
    let sum = 0;
    cart.forEach(item => {
      if (!item.promotion) {
        Console.print(
          `${item.name}      ${item.quantity}      ${(item.quantity * stock.getPrice(item.name)).toLocaleString()}`,
        );
        totalCount += item.quantity;
        sum += stock.getPrice(item.name) * item.quantity;
      }
    });
    return { totalCount, sum };
  },

  printPromotionItems(cart, stock) {
    let promotionCount = 0;
    let promotionSum = 0;
    cart.forEach(item => {
      if (item.promotion) {
        Console.print(`${item.name}      ${item.quantity}`);
        promotionCount += item.quantity;
        promotionSum += stock.getPrice(item.name) * item.quantity;
      }
    });
    return { promotionCount, promotionSum };
  },

  printFinalAmount(totalCount, sum, promotionSum, membership) {
    Console.print(`총구매액   ${totalCount}   ${sum.toLocaleString()}`);
    Console.print(`행사할인      -${promotionSum.toLocaleString()}`);
    let membershipDiscount = 0;
    if (membership) {
      membershipDiscount = Math.min(
        (sum - promotionSum) * 0.3 - (((sum - promotionSum) * 0.3) % 1000),
        8000,
      );
    }
    Console.print(`멤버십할인      -${membershipDiscount.toLocaleString()}`);
    Console.print(
      `내실돈 ${(sum - promotionSum - membershipDiscount).toLocaleString()}`,
    );
  },
};

export default OutputView;
