# 편의점
## 기능 목록
### 입력
- 구현에 필요한 상품 목록과 행사 목록을 파일 입출력을 통해 불러온다.
- 구매할 상품과 수량을 입력 받는다.
    - 상품명 수량은 하이픈 ex) 콜라-10
    - 개별 상품은 대괄호로 묶어 쉼표로 구분 ex) [콜라-10],[사이다-3]
- 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 그 수량만큼 추가 여부를 입력받는다.
    - Y: 증정 받을 수 있는 상품을 추가한다.
    - N: 증정 받을 수 있는 상품을 추가하지 않는다. -> 그럼 고객이 프로모션 상품을 포기하는 건가?
- 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부를 입력받는다.
    - Y: 일부 수량에 대해 정가로 결제한다.
    - N: 정가로 결제해야하는 수량만큼 제외한 후 결제를 진행한다.
- 멤버십 할인 적용 여부를 입력 받는다.
    - Y: 멤버십 할인을 적용한다.
    - N: 멤버십 할인을 적용하지 않는다.
- 추가 구매 여부를 입력 받는다.
    - Y: 재고가 업데이트된 상품 목록을 확인 후 추가로 구매를 진행한다.
    - N: 구매를 종료한다.

### 출력
- 환영 인사와 함께 상품명, 가격, 프로모션 이름, 재고를 안내한다. 만약 재고가 0개라면 재고 없음을 출력한다.
- 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우, 혜택에 대한 안내 메시지를 출력한다.
- 멤버십 할인 적용 여부를 확인하기 위해 안내 문구를 출력한다.
- 구매 상품 내역, 증정 상품 내역, 금액 정보를 출력한다.
- 추가 구매 여부를 확인하기 위해 안내 문구를 출력한다.
- "[ERROR]"로 시작하는 오류 메시지와 함께 상황에 맞는 안내를 출력한다.

### 재고 관리
- 각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다. 
    -> 구매 수량이 재고 수량을 초과한 경우 예외처리
    -> 존재하지 않는 상품 입력시 예외처리
- 고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다.

### 프로모션 할인
- 오늘 날짜가 프로모션 기간 내에 포함된 경우에만 할인을 적용한다. -> 오늘 날짜 아닌 경우 해당 없음
- 프로모션은 N개 구매 시 1개 무료 증정(Buy N Get 1 Free)의 형태로 진행된다.
- 1+1 또는 2+1 프로모션이 각각 지정된 상품에 적용되며, 동일 상품에 여러 프로모션이 적용되지 않는다.
- 프로모션 혜택은 프로모션 재고 내에서만 적용할 수 있다.
- 프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감하며, 프로모션 재고가 부족할 경우에는 일반 재고를 사용한다. -> 프로모션 재고가 부족한 경우 프로모션 적용 불가
- 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 필요한 수량을 추가로 가져오면 혜택을 받을 수 있음을 안내한다.
- 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제하게 됨을 안내한다.

### 멤버십 할인
- 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
- 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
- 멤버십 할인의 최대 한도는 8,000원이다.

### 영수증 출력
- 영수증은 고객의 구매 내역과 할인을 요약하여 출력한다.
- 영수증 항목은 아래와 같다.
    구매 상품 내역: 구매한 상품명, 수량, 가격
    증정 상품 내역: 프로모션에 따라 무료로 제공된 증정 상품의 목록
    금액 정보
    총구매액: 구매한 상품의 총 수량과 총 금액
    행사할인: 프로모션에 의해 할인된 금액
    멤버십할인: 멤버십에 의해 추가로 할인된 금액
    내실돈: 최종 결제 금액
- 영수증의 구성 요소를 보기 좋게 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게 한다.

### 구매 상품
- 구매한 상품명, 수량, 가격을 저장한다.


- 총 금액을 계산한다.