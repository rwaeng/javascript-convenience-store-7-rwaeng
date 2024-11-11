import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Cart from './domain/Cart.js';
import Validator from './domain/Validator.js';
import PromotionController from './controller/PromotionController.js';
import CartController from './controller/CartController.js';
import StockController from './controller/StockController.js';
import { restart } from './utils.js';
import { OUTPUT } from './constants.js';

class App {
  #stock;

  async run() {
    this.#stock = StockController.initStock();
    const result = await this.start();
    // await this.play();
  }

  async play() {
    while (true) {
      const result = await this.start();
      const more = await restart(InputView.getYesNo);
      if (more === 'Y') {
        StockController.updateStock(this.#stock, result);
        return await this.play();
      }
      break;
    }
  }

  async start() {
    this.initCasher();
    const cart = this.initializeCart;
    // const promotion = await PromotionController.initPromotion();
    // await this.applyPromotionsToCart(cart, promotion);
    // const membership = await this.checkMembershipDiscount();
    // this.printReceipt(cart.getCartItems(), this.#stock, membership);
    // OutputView.printMessage(OUTPUT.ADDITIONAL_PURCHASE);

    // return cart.getCartItems();
  }

  initCasher() {
    OutputView.printMessage(OUTPUT.WELCOME);
    const stockData = this.#stock.getStock();
    OutputView.printProducts(stockData);
    OutputView.printMessage(OUTPUT.GET_PRODUCTS);
  }

  async initializeCart() {
    while (true) {
      try {
        const products = await InputView.getProducts();
        products.forEach(product => {
          Validator.validateCartItem(this.#stock.getStock(), product);
        });
      } catch (error) {
        Console.print(error.message);
      }
      return new Cart(products);
    }
  }

  async applyPromotionsToCart(cart, promotion) {
    const cartItems = [...cart.getCartItems()];
    for (const item of cartItems) {
      await this.processPromotionForItem(item, promotion, cart);
    }
  }

  async processPromotionForItem(item, promotion, cart) {
    const stockPromotion = this.#stock.getPromotion(item.name);
    const promotionInfo = promotion.getPromotion(stockPromotion);
    if (stockPromotion === 'null') return;

    const isValid = PromotionController.isValidPromotion(
      promotion,
      promotionInfo,
    );
    if (!isValid) return;

    const stockQuantity = this.#stock.getQuantity(item.name, stockPromotion);
    const buy = Number(promotionInfo.buy);
    const get = Number(promotionInfo.get);

    if (stockQuantity <= item.quantity) {
      await this.handleFullPricePrompt(item, stockQuantity, buy, get, cart);
    } else {
      await this.handlePromotionCount(item, buy, get, cart);
    }
  }

  async handleFullPricePrompt(item, stockQuantity, buy, get, cart) {
    const count = PromotionController.countAvailablePromotionProduct(
      stockQuantity,
      buy,
      get,
    );
    const countFullprice = item.quantity - (buy + get) * count;
    OutputView.askToPayFullPrice(item.name, countFullprice);
    await CartController.addRemoveCartItem(cart, item, countFullprice, count);
  }

  async handlePromotionCount(item, buy, get, cart) {
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
      OutputView.askToAddFreeProducts(item.name, moreProduct);
      await CartController.addCartItem(
        cart,
        item.name,
        moreProduct,
        promoCount,
      );
    } else {
      cart.addCartItem(item.name, promoCount);
      cart.removeCartItem(item.name, promoCount);
    }
  }

  async checkMembershipDiscount() {
    OutputView.printMessage(OUTPUT.MEMBERSHIP_DISCOUNT);
    const answer = await InputView.getYesNo();
    return answer === 'Y';
  }

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
  }

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
  }

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
  }

  printFinalAmount(totalCount, sum, promotionSum, membership) {
    Console.print(`총구매액      ${(totalCount, sum.toLocaleString())}`);
    Console.print(`행사할인      -${promotionSum.toLocaleString()}`);
    let membershipDiscount = 0;
    if (membership) {
      membershipDiscount = Math.min((sum - promotionSum) * 0.3, 8000);
    }
    Console.print(`멤버십할인      -${membershipDiscount.toLocaleString()}`);
    Console.print(
      `내실돈 ${(sum - promotionSum - membershipDiscount).toLocaleString()}`,
    );
  }
}

export default App;
