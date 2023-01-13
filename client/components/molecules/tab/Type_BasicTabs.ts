import React from 'react';
export interface BasicTabsPropsType {
  handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  bgcolor?: string;
  color?: string;
  borderBottom?: number;
  borderColor?: string;
  tabLabels: string[];
  centered: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  currentTab: number;
}
