class Stock {
  #products;

  constructor(data) {
    this.#products = this.#insertProductData(data);
  }

  #insertProductData(data) {
    const insertedProducts = data.reduce((acc, product) => {
      acc.push({
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      });
      if (this.#isthereSameProductName(data, product)) {
        acc.push({
          ...product,
          price: Number(product.price),
          quantity: 0,
          promotion: 'null',
        });
      }

      return acc;
    }, []);

    return insertedProducts;
  }

  #isthereSameProductName(data, product) {
    const hasPromotion = data.some(
      p =>
        p.name === product.name &&
        p.price === product.price &&
        p.promotion !== 'null',
    );
    const hasNoPromotion = data.some(
      p =>
        p.name === product.name &&
        p.price === product.price &&
        p.promotion === 'null',
    );

    return hasPromotion && !hasNoPromotion;
  }

  getStock() {
    return this.#products;
  }

  reduceStock(name, quantity) {
    this.#products = this.#products.map(product => {
      if (product.name === name) {
        return { ...product, quantity: product.quantity - quantity };
      }
      return product;
    });
  }
}

export default Stock;
