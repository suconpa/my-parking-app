interface PurchaseSlice {
  productDetailData: productDetailDataType;
  setProductDetailData: (data: productDetailDataType) => void;
}

interface PaymentData {
  pg: string; // PG사
  pay_method: string; // 결제수단
  merchant_uid: string; // 주문번호
  amount: number; // 결제금액
  name: string; // 주문명
  buyer_name: string; // 구매자 이름
  buyer_tel: string; // 구매자 전화번호
  buyer_email: string; // 구매자 이메일
  buyer_addr: string; // 구매자 주소
}

interface PaymentResDataType {
  //안쓰는 타입 수정예정
  apply_num: string;
  bank_name: null | string;
  buyer_addr: string;
  buyer_email: string;
  buyer_name: string;
  buyer_postcode: null | string;
  buyer_tel: string;
  card_name: null | string;
  card_number: string;
  card_quota: number;
  currency: string;
  custom_data: null | string;
  imp_uid: string;
  merchant_uid: string;
  name: string;
  paid_amount: number;
  paid_at: number;
  pay_method: string;
  pg_provider: string;
  pg_tid: string;
  pg_type: string;
  receipt_url: string;
  status: string;
  success: boolean;
  error_msg: string;
}

// 예시로 사용한 타입은 필요에 따라 수정 가능합니다.
