import { useNavigate } from "react-router-dom";

import classes from "./CustomOverlayBox.module.css";

type Props = {
  setIsOverlayOpen: (b: boolean) => void;
  setSelectedMarker: (idx: number | null) => void;
  title: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  linkId: number | undefined;
  mainImage: string | undefined;
};
const CustomOverlayBox = ({
  setIsOverlayOpen,
  setSelectedMarker,
  title,
  startDate,
  endDate,
  linkId,
  mainImage,
}: Props) => {
  const navigate = useNavigate();
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedMarker(null);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <div className={classes.head}>
          {title}
          <button onClick={closeOverlay}>X</button>
        </div>
        <div className={classes.body}>
          <div className={classes.img}>
            <img src={mainImage} alt="등록된 이미지" />
          </div>
          <div className={classes.desc}>
            <div className={classes.period}>
              {startDate} {"~"} {endDate}
            </div>
            <small onClick={() => navigate(`/products/${linkId}`)}>
              게시글 보러가기
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOverlayBox;
