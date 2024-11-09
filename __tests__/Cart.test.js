import Cart from '../src/domain/Cart.js';

describe('Cart 클래스 테스트', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart([
      { name: '콜라', quantity: 5 },
      { name: '초코바', quantity: 3 },
    ]);
  });

  test('저장된 장바구니 목록을 반환한다.', () => {
    expect(cart.getCartItems()).toEqual([
      { name: '콜라', quantity: 5 },
      { name: '초코바', quantity: 3 },
    ]);
  });

  test('장바구니에 상품을 추가할 경우 수량을 증가시킨다.', () => {
    cart.addCartItem('콜라', 1);

    expect(cart.getCartItems()).toEqual([
      { name: '콜라', quantity: 6 },
      { name: '초코바', quantity: 3 },
    ]);
  });

  test('프로모션인 상품을 추가할 경우 promotion 키를 가진 객체를 생성한다.', () => {
    cart.addPromotionItem('콜라', 1);

    expect(cart.getCartItems()).toContainEqual({
      name: '콜라',
      quantity: 1,
      promotion: true,
    });
  });

  test('정가 결제를 원하지 않을 시 장바구니에서 물건을 삭제한다.', () => {
    cart.removeCartItem('콜라', 1);

    expect(cart.getCartItems()).toEqual([
      {
        name: '콜라',
        quantity: 4,
      },
      { name: '초코바', quantity: 3 },
    ]);
  });

  test('수량이 0인 경우 장바구니에서 완전히 삭제한다.', () => {
    cart.removeCartItem('초코바', 3);

    expect(cart.getCartItems()).not.toContainEqual({
      name: '초코바',
      quantity: 0,
    });
  });
});
