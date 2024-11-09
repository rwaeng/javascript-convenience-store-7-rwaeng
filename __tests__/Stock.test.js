import Stock from '../src/domain/Stock';

describe('Stock 클래스 테스트', () => {
  let stock;

  beforeEach(() => {
    const data = [
      { name: '콜라', price: '1000', quantity: '10', promotion: '탄산2+1' },
      { name: '초코바', price: '1200', quantity: '5', promotion: 'MD추천상품' },
      { name: '물', price: '500', quantity: '10', promotion: 'null' },
    ];
    stock = new Stock(data);
  });

  test('데이터 삽입 시 초기값을 설정한다.', () => {
    const products = stock.getStock();

    expect(products).toEqual([
      { name: '콜라', price: 1000, quantity: 10, promotion: '탄산2+1' },
      { name: '콜라', price: 1000, quantity: 0, promotion: 'null' },
      { name: '초코바', price: 1200, quantity: 5, promotion: 'MD추천상품' },
      { name: '초코바', price: 1200, quantity: 0, promotion: 'null' },
      { name: '물', price: 500, quantity: 10, promotion: 'null' },
    ]);
  });

  test('결제된 수량만큼 재고에서 차감하여 수량을 관리한다.', () => {
    stock.reduceStock('콜라', 3);
    const products = stock.getStock();

    expect(products.find(product => product.name === '콜라').quantity).toBe(7);
  });

  test('한 제품의 재고 차감은 다른 제품에 영향을 주지 않는다.', () => {
    stock.reduceStock('콜라', 3);
    const products = stock.getStock();

    expect(products.find(product => product.name === '물').quantity).toBe(10);
  });

  test('상품의 이름을 전달하면 프로모션 여부를 확인하고 프로모션을 반환한다.', () => {
    expect(stock.getPromotion('초코바')).toBe('MD추천상품');
  });

  test('상품의 이름과 프로모션을 전달하면 남은 재고의 개수를 반환한다.', () => {
    expect(stock.getQuantity('초코바', 'MD추천상품')).toBe(5);
  });
});
