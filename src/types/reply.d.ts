// 리뷰 입력시 body에 입력되어야 할 필수 값
interface RepliesPostType {
  order_id: number | undefined;
  product_id: number | undefined;
  rating: number;
  content: staring;
}

// 리뷰 list 가져올 때 받을 데이터 타입
interface RepliesGetType {
  item: RepliesGetItemType[];
}

interface RepliesGetItemType {
  _id: number;
  image: {
    url: string;
  };
  name: string;
  price: number;
  replies: RepliesItem[];
}

interface RepliesItem {
  content: string;
  rating: number;
}

//MyReplies item data 타입

interface MyReplies {
  item: MyRepliesItem[];
}

interface MyRepliesItem {
  content: string;
  name: string;
  rating: number;
  product: {
    image: {
      url: string;
    };
  };
}
interface ReplyCheck {
  data: {
    item: {
      content: string;
    }[];
  };
}
