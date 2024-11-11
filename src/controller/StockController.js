import Stock from '../domain/Stock.js';
import InputView from '../view/InputView.js';

const StockController = {
  initStock() {
    // const productData = InputView.readFile('public/products.md');
    const stock = new Stock(productData);

    return stock;
  },
  updateStock(stock, soldItems) {
    const removePromotion = soldItems.filter((item) => !item.promotion)
    removePromotion.forEach(item =>
      stock.reduceStock(item.name, item.quantity),
    );
  },
};

export default StockController;
