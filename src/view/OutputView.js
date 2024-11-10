import { Console } from '@woowacourse/mission-utils';
import { writeFileSync } from 'fs';

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

  writeFile(data) {
    const filePath = 'public/products.md';
    const header = 'name,price,quantity,promotion';
    const rows = data
      .filter(item => item.quantity > 0)
      .map(
        item => `${item.name},${item.price},${item.quantity},${item.promotion}`,
      )
      .join('\n');
    const csvContent = `${header}\n${rows}`;

    writeFileSync(filePath, csvContent, 'utf8');
  },
};

export default OutputView;
