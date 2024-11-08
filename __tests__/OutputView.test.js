import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../src/view/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('OutputView 객체 테스트', () => {
  test('환영 인사와 함께 상품명, 가격, 프로모션 이름, 재고를 안내한다.', () => {
    const logSpy = getLogSpy();
    const mockProductList = [
      { name: '탄산수', price: '1200', quantity: '5', promotion: '탄산2+1' },
      { name: '물', price: '500', quantity: '10', promotion: 'null' },
      { name: '비타민워터', price: '1500', quantity: '6', promotion: 'null' },
    ];

    OutputView.printWelcome(mockProductList);

    const logs = [
      '안녕하세요. W편의점입니다.',
      '현재 보유하고 있는 상품입니다.',
      '- 탄산수 1,200원 5개 탄산2+1',
      '- 물 500원 10개',
      '- 비타민워터 1,500원 6개',
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
    ];

    logs.forEach(log => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('프로모션 적용이 가능한 상품에 대한 안내 메시지를 출력한다.', () => {
    const logSpy = getLogSpy();
    const productName = '콜라';
    const amount = 1;

    OutputView.askToAddFreeProducts(productName, amount);

    const log = `현재 ${productName}은(는) ${amount}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`;
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});
