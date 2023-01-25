export interface nTabsType {
  children: React.ReactNode;
  tabLabels: string[];
  centered?: boolean;
  ariaLabel?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  PannelPadding?: number;
  themeSub?: boolean;
}
