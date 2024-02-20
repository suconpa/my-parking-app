// 상품 아이템 데이터 타입
interface ProductItemType {
  _id?: number;
  seller_id?: number;
  price: number;
  shippingFees?: number;
  show?: boolean;
  active?: boolean;
  name: string;
  mainImages: mainImageType[];
  content: string;
  createdAt?: string;
  updatedAt?: string;
  extra?: ExtraDataType;
  replies?: RepliesDataType[];
  quantity?: number;
}

// extra 추가 상품 정보 타입
interface ExtraDataType {
  isNew?: boolean;
  isBest?: boolean;
  category?: string[];
  quantity?: number;
  buyQuantity?: number;
  sort?: number;
  // 밑에는 우리가 넣은 타입
  startDate?: string; // 대여시작일
  endDate?: string; // 대여 종료일
  address?: string; // 상품등록주소
  lat?: number; // 상품 주소의 위도 좌표
  lng?: number; // 상품 주소의 경도 좌표
  sellerNickname?: string; // 게시글을 올린 판매자의 이름
}

// 상품 등록시 메인이미지
interface mainImageType {
  url: string;
  fileName: string;
  orgName: string;
}

interface FilesResType {
  originalname: string;
  name: string;
  path: string;
}

// 리뷰 데이터 타입
interface RepliesDataType {
  _id: number;
  userName: number;
  product_id?: number;
  rating: number;
  content: string;
  createdAt: string;
}

// 상품 리스트 데이터 타입
type ProductListType = ProductItemType[];

// Axios GET Response
interface ProductItemResType {
  ok: 0 | 1;
  item: ProductItemType;
  _id: number;
}
interface ProductListResType {
  ok: 0 | 1;
  item: ProductListType;
}

/////////////////////////////////////////////////////

interface ProductSlice {
  productItem: ProductItemType;
  productList: ProductListType;
}
