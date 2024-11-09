import Promotion from '../src/domain/Promotion.js';

describe('Promotion 클래스 테스트', () => {
  const promotions = [
    {
      name: '탄산2+1',
      buy: 2,
      get: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
    },
    {
      name: '반짝할인',
      buy: 1,
      get: 1,
      start_date: '2024-11-01',
      end_date: '2024-11-30',
    },
  ];

  let promotion;

  beforeEach(() => {
    promotion = new Promotion(promotions);
  });

  test('프로모션 이름을 전달하면 해당 프로모션에 대한 정보를 반환한다.', () => {
    const result = promotion.getPromotion('탄산2+1');

    expect(result).toEqual({
      name: '탄산2+1',
      buy: 2,
      get: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
    });
  });

  test('없는 프로모션을 전달하는 경우 undefined를 반환한다.', () => {
    const result = promotion.getPromotion('가짜 프로모션');

    expect(result).toBeUndefined();
  });

  test('입력한 날짜가 프로모션이 진행되는 기간에 속하면 true를 반환한다.', () => {
    const promotionItem = promotion.getPromotion('반짝할인');
    const today = new Date('2024-11-09');
    const result = promotion.isAvailable(promotionItem, today);

    expect(result).toBe(true);
  });

  test('입력한 날짜가 프로모션이 진행되는 기간보다 빠르면 false를 반환한다.', () => {
    const promotionItem = promotion.getPromotion('반짝할인');
    const today = new Date('2024-10-31');
    const result = promotion.isAvailable(promotionItem, today);

    expect(result).toBe(false);
  });

  test('입력한 날짜가 프로모션이 진행되는 기간보다 느리면 false를 반환한다.', () => {
    const promotionItem = promotion.getPromotion('반짝할인');
    const today = new Date('2024-12-01');
    const result = promotion.isAvailable(promotionItem, today);

    expect(result).toBe(false);
  });
});
