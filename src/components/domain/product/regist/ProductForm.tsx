// 이전 모바일 스타일 등록하기 양식을 하나로 합쳐진 양식 폼입니다.
// 해당 상품 등록하기 폼은 추후 수정할 페이지와 공통으로 사용할 컴포넌트로 생각하고 구성한 컴포넌트입니다.
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./ProductForm.module.css";

import { BASE_URL } from "../../../../services/BaseUrl";

import RegistKakaoMap from "../../../common/map/RegistKakaoMap";
// import { useBoundStore } from "../../../../store";

type Props = {
  title: string;
  onSubmit: (
    data: ProductItemType,
    mainImages: mainImageType[] | undefined
  ) => void;
  product: ProductItemType;
};

const ProductForm = ({ title, onSubmit, product }: Props) => {
  const navigate = useNavigate();
  // const imageUpload = useBoundStore((state) => state.uploadImage);
  const [formData, setFormData] = useState<ProductItemType>({
    name: product.name,
    content: product.content,
    price: product.price,
    extra: {
      startDate: product.extra?.startDate,
      endDate: product.extra?.endDate,
      address: product.extra?.address,
      lat: product.extra?.lat,
      lng: product.extra?.lng,
    },
    mainImages: product.mainImages
  });
  const inputRefImage = useRef<HTMLInputElement>(null);
  const [mainImages, setMainImages] = useState<mainImageType[] | undefined>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // extra 필드일땐 한번더 중첩복사
    if (["startDate", "endDate"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        extra: {
          ...prevData.extra,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddImagesChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const imageLists = event.target.files;

    if (imageLists !== null) {
      // formData 사용
      const formData = new FormData();

      for (let i = 0; i < imageLists.length; i++) {
        formData.append("attach", imageLists[i]);
      }

      try {
        const imagesRes = await axios.post(`${BASE_URL}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // 이미지 응답 데이터 담아서 배열로 추출(path === url, name === fileName, orginalname === orgName)
        let imageUrlLists: mainImageType[] = [];

        if (imagesRes.data.files) {
          imageUrlLists = imagesRes.data.files.map((file: FilesResType) => ({
            url: file.path,
            orgName: file.originalname,
            fileName: file.name,
          }));
        }
        if (imagesRes.data.file) {
          const imagePath = {
            url: imagesRes.data.file.path,
            orgName: imagesRes.data.file.originalname,
            fileName: imagesRes.data.file.name,
          };
          imageUrlLists.push(imagePath);
        }

        setMainImages(imageUrlLists);
      } catch (err) {
        console.error("이미지를 업로드하는데 문제가 발생하였습니다.", err);
      }
    }
  };

  // 최종 서버로 상태 끌어올리기
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData, mainImages);
  };

  return (
    <form
      encType="multipart/form-data"
      className={classes["form-container"]}
      onSubmit={handleSubmit}
    >
      <h2>내 주차장 {title}하기</h2>
      <div className={classes["info-wrapper"]}>
        <label htmlFor="name">제목</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          cols={30}
          rows={10}
          required
          onChange={handleChange}
        />

        <label htmlFor="startDate">대여 시작일</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.extra?.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">대여 종료일</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.extra?.endDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">대여 비용(원)</label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className={classes["images-wrapper"]}>
        <label htmlFor="images">주차장 사진 등록</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          ref={inputRefImage}
          onChange={handleAddImagesChange}
        />
      </div>
      <div className={classes["location-wrapper"]}>
        <label>위치 선택하기</label>
        <RegistKakaoMap
          formData={formData}
          setFormData={setFormData}
          product={product}
        />
      </div>

      <div className={classes.action}>
        <button type="button" onClick={() => navigate(-1)}>
          취소
        </button>
        <button type="submit">저장</button>
      </div>
    </form>
  );
};

export default ProductForm;

// // 클릭 시 이미지 삭제 -> issues: 서버에 이미 보낸 이미지파일이라 삭제가 안됨.. 미리보기 사진만 없어지는 문제있음
// const handleDeleteImage = (id: number) => {
//   // 클릭한 이미지의 path 값을 가져오기
//   const deletedImagePath = mainImages?.[id];

//   // images 상태에서 클릭한 이미지를 제거
//   const updatedImages = images?.filter((_, index: number) => index !== id);
//   setImages(updatedImages);

//   // mainImages 상태에서도 클릭한 이미지의 path를 제거
//   if (deletedImagePath) {
//     const updatedMainImages = mainImages?.filter(
//       (imagePath) => imagePath !== deletedImagePath
//     );
//     setMainImages(updatedMainImages);
//   }
// };
