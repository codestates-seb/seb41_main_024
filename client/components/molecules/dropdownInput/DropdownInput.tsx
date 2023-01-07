import { FormControl, FormHelperText } from "@mui/material";
import React from "react";
import Input from "../../atoms/input/Input";
const categories = [
  { label: "상품 쉐어링", value: "product" },
  { label: "배달음식 쉐어링", value: "delivery" },
];
const DropdownInput = (props) => {
  return (
    <FormControl sx={{ m: 1, width: "328px" }} variant="outlined">
      <Input
        id="category"
        label="카테고리"
        select={true}
        defaultValue="상품 쉐어링"
        selectProps={{
          native: true,
        }}
      >
        {categories.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Input>
      <FormHelperText id="outlined-category-helper-text">
        카테고리를 선택해주세요
      </FormHelperText>
    </FormControl>
  );
};

export default DropdownInput;
