import React, { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";
import OrderCard from "../ordercard/OrderCard";
import { useNavigate } from "react-router-dom";
import MediaQuery from "../../../UI/MediaQuery";
import classes from "./OrderHistory.module.css";
import { BASE_URL } from "../../../../services/BaseUrl";
import "react-loading-skeleton/dist/skeleton.css";
import OrderHistoryListSkeleton from "./OrderHistoryListSkeleton";
import Loading from "../../../common/Loading";

const OrderHistoryList: React.FC = () => {
  const navigate = useNavigate();
  const mediaQuery = MediaQuery();

  //데이터 로딩 상태
  const [loading, setLoading] = useState(false);

  //로딩된 이미지 개수 상태
  const [imgLoadingCount, setImgLoadingCount] = useState(0);

  //완료된 이미지와 배열의 length가 같은지 판단하는 상태
  const [imgLoaded, setImgLoaded] = useState(false);

  //주문 목록 조회 데이터
  const [getOrderHistoryData, setGetOrderHistoryData] = useState<
    OrderHistoryProduct[]
  >([]);
  const axiosInstance = useCustomAxios();

  useEffect(() => {
    const getOrdersData = async () => {
      //orders 로 주문 목록 조회 데이터
      const getOrdersData = await axiosInstance<OrderHistoryData>("/orders");
      setLoading(true);
      return setGetOrderHistoryData(getOrdersData.data.item);
    };

    getOrdersData();
  }, []);

  useEffect(() => {
    console.log(imgLoadingCount);
    if (imgLoadingCount == 5) {
      setImgLoaded(true);
    }
  }, [imgLoadingCount]);

  const handleNavigate = (_id: number, productItems: OrderHistoryProduct) => {
    const productItemsData = {
      updatedAt: productItems.updatedAt,
      _id: productItems._id,
      products: productItems.products,
      // 기존 data는 buyDate 가 없기 때문에 없다면 null 을 부여합니다.
      buyDate:
        productItems.extra && productItems.extra.buyDate
          ? productItems.extra.buyDate
          : null,
    };

    // 상품 디테일 페이지로 이동하기
    // 이동할 페이지 path: "/order-history/:orderId"
    navigate(`/order-history/${_id}`, {
      //   주문목록 조회시 렌더링 된 Item 배열의 값
      // OrderHistoryDetailList 컴포넌트로 가져감
      state: { orderHistoryData: productItemsData },
    });
  };

  return (
    <>
      <h2 className={classes.h2}>내 주문목록</h2>
      {mediaQuery || (
        <div className={classes.orderHistoryListContainer}>
          <ul>
            <li>상품정보</li>
            <li>결제금액</li>
          </ul>
        </div>
      )}
      {loading && getOrderHistoryData.length !== 0 ? (
        getOrderHistoryData?.map((item) => {
          return (
            <div key={item._id}>
              <OrderCard
                orderItems={item.products.length}
                title={item.products[0].name}
                image={
                  item.products[0].image?.url &&
                  BASE_URL + item.products[0].image?.url
                }
                buyDate={item.extra?.buyDate}
                onClick={() => handleNavigate(item._id, item)}
                totalPrice={item.cost.total}
                productPrice={item.products[0].price}
                onLoad={() => setImgLoadingCount((pre) => pre + 1)}
                display={imgLoaded ? "block" : "none"}
              />
              {imgLoaded || <OrderHistoryListSkeleton />}
            </div>
          );
        })
      ) : loading ? (
        <p className={classes.text}>구매한 상품이 없습니다</p>
      ) : (
        <Loading />
      )}
      {}
    </>
  );
};

export default OrderHistoryList;
