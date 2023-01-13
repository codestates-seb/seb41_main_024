import React from 'react';
export interface BasicTabsPropsType {
  handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  currentTab: number;
  bgcolor?: string;
  color?: string;
  borderBottom?: number;
  borderColor?: string;
  tabLabels: { label: string; index: number }[];
  centered: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  currentTab: number;
}
