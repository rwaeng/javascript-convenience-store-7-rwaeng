class Promotion {
  #promotions;

  constructor(promotions) {
    this.#promotions = promotions;
  }

  getPromotion(promotionName) {
    const promotion = this.#promotions.find(
      promotion => promotion.name === promotionName,
    );

    return promotion;
  }

  isAvailable(promotion, today) {
    const startDate = new Date(promotion.start_date);
    const endDate = new Date(promotion.end_date);

    if (today >= startDate && today <= endDate) {
      return true;
    }
    return false;
  }
}

export default Promotion;
