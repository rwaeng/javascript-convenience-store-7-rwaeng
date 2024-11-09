class Cart {
  #cartItems;

  constructor(cartItems) {
    this.#cartItems = cartItems;
  }

  getCartItems() {
    return this.#cartItems;
  }

  addCartItem(itemName, itemQuantity) {
    this.#cartItems = this.#cartItems.map(item => {
      if (item.name === itemName) {
        return { ...item, quantity: item.quantity + itemQuantity };
      }
      return item;
    });
  }

  addPromotionItem(itemName, itemQuantity) {
    this.#cartItems.push({
      promotion: true,
      name: itemName,
      quantity: itemQuantity,
    });
  }

  removeCartItem(itemName, itemQuantity) {
    this.#cartItems = this.#cartItems
      .map(item => {
        if (item.name === itemName) {
          return {
            ...item,
            quantity: Math.max(item.quantity - itemQuantity, 0),
          };
        }
        return item;
      })
      .filter(item => item.quantity > 0);
  }
}

export default Cart;
