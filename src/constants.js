const REG_EXP = /^\[(.+)-(\d+)\]$/;

const INPUT = Object.freeze({
  
});

const OUTPUT = Object.freeze({
  WELCOME: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n',
  GET_PRODUCTS:
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
  MEMBERSHIP_DISCOUNT: '멤버십 할인을 받으시겠습니까? (Y/N)\n',
  ADDITIONAL_PURCHASE: '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',
});

const ERROR = Object.freeze({
  INPUT: {
    WRONG: '[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.',
    INVALID_FORMAT:
      '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
  },
});

export { REG_EXP, INPUT, OUTPUT, ERROR };
