import { OUTPUT } from './constants.js';
import InputView from './View/InputView.js';
import OutputView from './view/OutputView.js';
import { restart } from './utils.js';
import PromotionController from './controller/PromotionController.js';
import CartController from './controller/CartController.js';
import StockController from './controller/StockController.js';
import Cart from './domain/Cart.js';
import Validator from './domain/Validator.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  #stock;

  initCasher() {
    OutputView.printMessage(OUTPUT.WELCOME);
    const stockData = this.#stock.getStock();

    OutputView.printProducts(stockData);
    OutputView.printMessage(OUTPUT.GET_PRODUCTS);
  }

  async initCart(stock) {
    const products = await InputView.getProducts();

    products.forEach(product => {
      Validator.validateCartItem(stock, product);
    });

    const cart = new Cart(products);
    return cart;
  }

  async start() {
    this.initCasher();
    const cart = await restart(() => this.initCart(this.#stock.getStock()));
    const promotion = await PromotionController.initPromotion();

    // 카트에 담긴 상품 중에
    const cartItems = [...cart.getCartItems()];

    for (const item of cartItems) {
      const stockPromotion = this.#stock.getPromotion(item.name);
      const promotionInfo = promotion.getPromotion(stockPromotion);
      if (stockPromotion === 'null') continue;

      const isValid = PromotionController.isValidPromotion(
        promotion,
        promotionInfo,
      );
      if (!isValid) continue;

      // 프로모션 재고 확인
      const stockQuantity = this.#stock.getQuantity(item.name, stockPromotion);
      const buy = Number(promotionInfo.buy);
      const get = Number(promotionInfo.get);

      // 개수 모자라는 만큼 정가 결제 여부 물어봄
      if (stockQuantity <= item.quantity) {
        const count = PromotionController.countAvailablePromotionProduct(
          stockQuantity,
          buy,
          get,
        );
        const countFullprice = item.quantity - (buy + get) * count;

        OutputView.askToPayFullPrice(item.name, countFullprice);
        await CartController.addRemoveCartItem(
          cart,
          item,
          countFullprice,
          count,
        );
        continue;
      }

      // 프로모션 적용 가능 개수
      const promoCount = PromotionController.countAvailablePromotionProduct(
        item.quantity,
        buy,
        get,
      );
      const moreProduct = PromotionController.isAvailableMoreProduct(
        item.quantity,
        buy,
        get,
      );

      if (moreProduct) {
        // 프로모션 적용 상품까지는 안 가지고 왔지만 프로모션 조건은 만족하도록 갖고 온 경우
        OutputView.askToAddFreeProducts(item.name, moreProduct);
        await CartController.addCartItem(
          cart,
          item.name,
          moreProduct,
          promoCount,
        );
        continue;
      }

      cart.addCartItem(item.name, promoCount);
      cart.removeCartItem(item.name, promoCount);
    }

    const membership = await restart(() => this.checkMembershipDiscount());

    this.printReceipt(cart.getCartItems(), this.#stock, membership);
    OutputView.printMessage(OUTPUT.ADDITIONAL_PURCHASE);

    return cart.getCartItems();
  }

  async run() {
    this.#stock = StockController.initStock();
    await this.play();
    OutputView.writeFile(this.#stock.getStock());
  }

  async play() {
    while (true) {
      const result = await this.start();
      const more = await restart(() => InputView.getYesNo());
      if (more === 'Y') {
        StockController.updateStock(this.#stock, result);
        return await this.play();
      }
      break;
    }
  }

  async checkMembershipDiscount() {
    OutputView.printMessage(OUTPUT.MEMBERSHIP_DISCOUNT);
    const answer = await InputView.getYesNo();
    if (answer === 'Y') return true;
    return false;
  }

  printReceipt(cart, stock, membership) {
    OutputView.printMessage('======편의점=======');
    OutputView.printMessage('상품명 수량 금액');
    let totalCount = 0;
    let sum = 0;
    cart.forEach(item => {
      if (!item.promotion) {
        Console.print(
          item.name,
          item.quantity,
          (item.quantity * stock.getPrice(item.name)).toLocaleString(),
        );
        totalCount += item.quantity;
        sum += stock.getPrice(item.name) * item.quantity;
      }
    });
    OutputView.printMessage('=======증정=======');
    let promotionCount = 0;
    let promotionSum = 0;
    cart.forEach(item => {
      if (item.promotion) {
        Console.print(item.name, item.quantity);
        promotionCount += item.quantity;
        promotionSum += stock.getPrice(item.name) * item.quantity;
      }
    });
    OutputView.printMessage('==================');
    Console.print('총구매액', totalCount, sum.toLocaleString());
    Console.print('행사할인', `-${promotionSum.toLocaleString()}`);
    let membershipDiscount = 0;
    if (membership) {
      membershipDiscount = Math.max((sum - promotionSum) * 0.3, 8000);
    }
    Console.print('멤버십할인', `-${membershipDiscount.toLocaleString()}`);
    Console.print('내실돈');
    Console.print((sum - promotionSum - membershipDiscount).toLocaleString());
  }
}

export default App;
