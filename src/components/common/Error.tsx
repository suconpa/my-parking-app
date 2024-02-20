import classes from "./Error.module.css";
import { Button } from "@mui/material";

import ERRORIMAGE from "../../assets/images/error-image.png";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <h1>해당 페이지는 잘못 접근한 페이지 입니다.</h1>
      <img src={ERRORIMAGE} />
      <Button
        color="primary"
        sx={{
          fontSize: "25px",
          fontWeight: 600,
        }}
        onClick={() => navigate("/home")}
      >
        홈 페이지로 돌아가기
      </Button>
    </div>
  );
};

export default Error;
