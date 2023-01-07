import React from "react";
export interface inputPropsType {
  id: string;
  label: string;
  type: string;
  InputProps: {
    endAdornment: React.ReactNode;
  };
}
