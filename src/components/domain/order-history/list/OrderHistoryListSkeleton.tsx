import React from "react";
import Skeleton from "react-loading-skeleton";
import classes from "./OrderHistoryListSkeleton.module.css";
import { Box } from "@mui/system";
import MediaQuery from "../../../UI/MediaQuery";

const OrderHistoryListSkeleton = () => {
  const isMobile = MediaQuery();
  return (
    <div className={classes.OrderHistoryListSkeletonContainer}>
      <Box
        sx={{
          display: "flex",
          justifyContent: " space-evenly",
          mt: "25px",
          mb: "25px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexBasis: "200px",
            margin: "10px",
            //모바일 일때 크기
            flex: isMobile ? 2 : undefined,
          }}
        >
          <div className={classes.orderDate}>
            <Skeleton />
          </div>
          <Skeleton height={"10vh"} />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
            flex: 3,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "10px" : null,
          }}
        >
          <Skeleton width={"100px"} />
          <Skeleton width={"100px"} />
          <Skeleton width={"100px"} />
          {/* <Box>{sellerId}</Box> */}
        </Box>
      </Box>
    </div>
  );
};

export default OrderHistoryListSkeleton;
