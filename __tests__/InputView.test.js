import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from '../src/View/InputView';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

describe('InputView 클래스 테스트', () => {
  test('구현에 필요한 목록을 파일 입출력을 통해 불러온다.', () => {
    const fileName = 'public/products.md';
    const result = InputView.readFile(fileName);

    expect(result).toEqual([
      '콜라,1000,10,탄산2+1',
      '콜라,1000,10,null',
      '사이다,1000,8,탄산2+1',
      '사이다,1000,7,null',
      '오렌지주스,1800,9,MD추천상품',
      '탄산수,1200,5,탄산2+1',
      '물,500,10,null',
      '비타민워터,1500,6,null',
      '감자칩,1500,5,반짝할인',
      '감자칩,1500,5,null',
      '초코바,1200,5,MD추천상품',
      '초코바,1200,5,null',
      '에너지바,2000,5,null',
      '정식도시락,6400,8,null',
      '컵라면,1700,1,MD추천상품',
      '컵라면,1700,10,null',
    ]);
  });

  test('구매할 상품과 수량을 입력하면 객체로 반환한다.', async () => {
    const input = ['[사이다-2],[콜라-1]'];
    mockQuestions(input);

    const result = await InputView.getProducts();
    expect(result).toEqual({ 사이다: 2, 콜라: 1 });
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
});
