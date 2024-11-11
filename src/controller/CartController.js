import { Console } from '@woowacourse/mission-utils';
import Cart from '../domain/Cart.js';
import Validator from '../domain/Validator.js';
import InputView from '../view/InputView.js';
import restart from '../restart.js';

const CartController = {
  async initCart(stock) {
    let products;
    while (true) {
      try {
        products = await InputView.getProducts();

        products.forEach(product => {
          Validator.validateCartItem(stock.getStock(), product);
        });

        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    const cart = new Cart(products);
    return cart;
  },

  async addRemoveCartItem(cart, item, quantity, count) {
    const answer = await restart(() => InputView.getYesNo());

    if (answer === 'N') {
      cart.removeCartItem(item.name, quantity);
      cart.addPromotionItem(item.name, count);
    }
    if (answer === 'Y') {
      cart.addPromotionItem(item.name, count);
    }
  },

  async addCartItem(cart, name, quantity, promoCount) {
    const answer = await restart(() => InputView.getYesNo());

    if (answer === 'N') {
      cart.addPromotionItem(name, promoCount);
      cart.removeCartItem(name, quantity);
    }
    if (answer === 'Y') {
      cart.addCartItem(name, quantity);
      cart.addPromotionItem(name, quantity);
    }
  },
};

export default CartController;
