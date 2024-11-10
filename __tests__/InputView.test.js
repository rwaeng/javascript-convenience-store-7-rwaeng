import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from '../src/View/InputView';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

describe('InputView 객체 테스트', () => {
  test('구현에 필요한 목록을 파일 입출력을 통해 불러온 뒤 객체로 반환한다.', () => {
    const fileName = 'public/products.md';
    const result = InputView.readFile(fileName);

    expect(result).toEqual([
      { name: '콜라', price: '1000', quantity: '10', promotion: '탄산2+1' },
      { name: '콜라', price: '1000', quantity: '10', promotion: 'null' },
      { name: '사이다', price: '1000', quantity: '8', promotion: '탄산2+1' },
      { name: '사이다', price: '1000', quantity: '7', promotion: 'null' },
      { name: '오렌지주스',price: '1800', quantity: '9',promotion: 'MD추천상품'},
      { name: '탄산수', price: '1200', quantity: '5', promotion: '탄산2+1' },
      { name: '물', price: '500', quantity: '10', promotion: 'null' },
      { name: '비타민워터', price: '1500', quantity: '6', promotion: 'null' },
      { name: '감자칩', price: '1500', quantity: '5', promotion: '반짝할인' },
      { name: '감자칩', price: '1500', quantity: '5', promotion: 'null' },
      { name: '초코바', price: '1200', quantity: '5', promotion: 'MD추천상품' },
      { name: '초코바', price: '1200', quantity: '5', promotion: 'null' },
      { name: '에너지바', price: '2000', quantity: '5', promotion: 'null' },
      { name: '정식도시락', price: '6400', quantity: '8', promotion: 'null' },
      { name: '컵라면', price: '1700', quantity: '1', promotion: 'MD추천상품' },
      { name: '컵라면', price: '1700', quantity: '10', promotion: 'null' },
    ]);
  });

  test('구매할 상품과 수량을 입력하면 객체로 반환한다.', async () => {
    const input = ['[사이다-2],[콜라-1]'];
    mockQuestions(input);

    const result = await InputView.getProducts();
    expect(result).toEqual([
      { name: '사이다', quantity: 2 },
      { name: '콜라', quantity: 1 },
    ]);
  });

  test('아무 것도 입력하지 않으면 예외가 발생한다.', async () => {
    const input = [];
    mockQuestions(input);

    await expect(InputView.getProducts()).rejects.toThrow('[ERROR]');
  });

  test('[상품명-구매 수량]의 정해진 양식을 지키지 않으면 예외가 발생한다.', async () => {
    const input = ['사이다, 2'];
    mockQuestions(input);

    await expect(InputView.getProducts()).rejects.toThrow('[ERROR]');
  });

  test('알파벳 y 또는 n 입력 시 대문자 Y 또는 N을 반환한다.', async () => {
    let input = ['y'];
    mockQuestions(input);
    let result = await InputView.getYesNo();
    expect(result).toEqual('Y');

    input = ['n'];
    mockQuestions(input);
    result = await InputView.getYesNo();
    expect(result).toEqual('N');
  });

  test('대소문자 구분 없이 Y 또는 N이 아닌 입력값이 주어지면 예외가 발생한다.', async () => {
    const input = ['A'];
    mockQuestions(input);

    await expect(InputView.getYesNo()).rejects.toThrow('[ERROR]');
  });
});
