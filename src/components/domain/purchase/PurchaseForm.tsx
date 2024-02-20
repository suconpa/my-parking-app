import React from "react";
import { Box } from "@mui/system";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import PurchaseInformation from "./PurchaseInformation";
import classes from "./purchase.module.css";

interface PurchaseFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.SyntheticEvent<Element, Event>) => void;
  total: number;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({
  onSubmit,
  onChange,
  total,
}) => {
  return (
    <Box mt="50px" className={classes.purchaseFormContainer}>
      <PurchaseInformation />
      <h2>결제 수단</h2>
      <Box
        sx={{
          borderTop: "1px solid var(--color-gray-300)",
        }}
      >
        <form onSubmit={onSubmit}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="options"
              name="options"
              //라디오 버튼이 눌릴 때 발생하는 이벤트
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="신용/체크카드"
                onChange={onChange}
              />
              <FormControlLabel
                value="vbank"
                control={<Radio />}
                label="무통장입금"
                onChange={onChange}
              />
              <FormControlLabel
                value="phone"
                control={<Radio />}
                label="휴대폰"
                onChange={onChange}
              />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                color: "#EB5757",
                fontSize: "1.2rem",
                fontweight: "bold",
              }}
            >
              총 {total} 원
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PurchaseForm;
