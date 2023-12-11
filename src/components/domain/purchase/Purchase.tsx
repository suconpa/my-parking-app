import React, { useEffect, useState } from "react";
import PurchaseForm from "./PurchaseForm";
import OrderCard from "../order-history/ordercard/OrderCard";
import { useBoundStore } from "../../../store";
import useCustomAxios from "../../../services/useCustomAxios";
import OrderTitleBox from "../order-history/ordercard/OrderTitleBox";

const Purchase = () => {
  const productDetailData = useBoundStore((state) => state.productDetailData);
  const axiosInstance = useCustomAxios();
  const userBasicInfo = useBoundStore((state) => state.userBasicInfo);
  const [checked, setChecked] = useState({ name: "", value: false });
  const [todayDate, setTodayDate] = useState({
    dateString: "",
    timeString: "",
  });

  console.log(productDetailData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postData();
    // 결제수단을 입력하지 않을 시 경고 창
    if (!checked.value) {
      alert("결제수단을 선택해주세요");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;

    //체크된 라디오 버튼이 있는지 검사
    setChecked((prev) => ({
      ...prev,
      name: selectedValue,
      value: true,
    }));
  };

  // 오늘 날짜 받아오는 로직
  const getDateNow = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString("ko-KR");
    const timeString = today.toLocaleTimeString("ko-KR");
    const todayDate = {
      dateString: dateString,
      timeString: timeString,
    };

    return todayDate;
  };

  const postData = async () => {
    const body = {
      products: [
        {
          _id: productDetailData._id,
          quantity: productDetailData.quantity,
        },
      ],
      address: {
        name: userBasicInfo.address,
        value: userBasicInfo.address,
      },
    };

    try {
      await axiosInstance.post("/orders", body);
      alert("결제가 완료 되었습니다");
    } catch (error) {
      console.error("결제 에러");
    }
  };

  useEffect(() => {
    setTodayDate(getDateNow());
  }, []);

  return (
    <>
      <OrderTitleBox
        option1="상품정보"
        option2="대여기간"
        option3="판매자"
        option4="총 금액 "
      />
      <OrderCard
        title={productDetailData.name}
        image={productDetailData.mainImages[0]}
        buyDate={(todayDate.dateString, todayDate.timeString)}
        totalPrice={productDetailData.price}
        isVisible={false}
        startDate={productDetailData.extra.startDate}
        endDate={productDetailData.extra.endDate}
        sellerId={productDetailData.seller_id}
      />
      <PurchaseForm
        onSubmit={handleSubmit}
        onChange={handleOnChange}
        total={productDetailData.price}
      />
    </>
  );
};

export default Purchase;
