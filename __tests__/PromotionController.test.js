import PromotionController from "../src/controller/PromotionController";

describe('프로모션 컨트롤러 테스트', () => {
    test('상품에 적용되는 프로모션이 유효한지 반환한다.', () => {
        const mockPromotion = {
          start_date: '2024-11-11',
          end_date: '2024-12-31',
          isAvailable: jest.fn(),
        };
        const promotionInfo = {
          start_date: '2024-11-11',
          end_date: '2024-12-31',
        };
        const today = new Date('2024-11-15');

        mockPromotion.isAvailable.mockImplementation((promotion) => {
          const startDate = new Date(promotion.start_date);
          const endDate = new Date(promotion.end_date);
          return today >= startDate && today <= endDate;
        });

        const result = PromotionController.isValidPromotion(
          mockPromotion,
          promotionInfo,
        );
        expect(result).toBe(true);
    });

    test('프로모션으로 받을 수 있는 개수를 반환한다.', () => {
      const stockQuantity = 50;
      const buy = 3;
      const get = 1;

      const result = PromotionController.countAvailablePromotionProduct(
        stockQuantity,
        buy,
        get,
      );
      expect(result).toBe(Math.floor(stockQuantity / (buy + get)));
    });

    test('더 가지고 올 수 있는 프로모션 상품이 있는지 개수를 반환한다.', () => {
      const quantity = 2;
      const buy = 2;
      const get = 1;

      const result = PromotionController.isAvailableMoreProduct(
        quantity,
        buy,
        get,
      );
      expect(result).toBe(1);
    });
})