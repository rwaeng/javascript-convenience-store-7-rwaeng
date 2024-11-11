import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Cart from './domain/Cart.js';
import PromotionController from './controller/PromotionController.js';
import CartController from './controller/CartController.js';
import StockController from './controller/StockController.js';
import { OUTPUT } from './constants.js';
import restart from './restart.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  #stock;

  async run() {
    this.#stock = StockController.initStock();
    await this.play();
  }

  async play() {
    while (true) {
      const result = await this.start();
      const more = await restart(() => InputView.getYesNo());

      if (more === 'Y') {
        StockController.updateStock(this.#stock, result);
        continue;
      }
      break;
    }
  }

  async start() {
    this.initCasher();
    const products = await InputView.getProducts(this.#stock);
    const cart = new Cart(products);
    const promotion = await PromotionController.initPromotion();
    await this.applyPromotionsToCart(cart, promotion);
    const membership = await this.checkMembershipDiscount();
    OutputView.printReceipt(cart.getCartItems(), this.#stock, membership);
    OutputView.printMessage(OUTPUT.ADDITIONAL_PURCHASE);

    return cart.getCartItems();
  }

  initCasher() {
    OutputView.printMessage(OUTPUT.WELCOME);
    const stockData = this.#stock.getStock();
    OutputView.printProducts(stockData);
    OutputView.printMessage(OUTPUT.GET_PRODUCTS);
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
      cart.addPromotionItem(item.name, promoCount);
    }
  }

  async checkMembershipDiscount() {
    OutputView.printMessage(OUTPUT.MEMBERSHIP_DISCOUNT);
    const answer = await restart(() => InputView.getYesNo());
    return answer === 'Y';
  }
}

export default App;
