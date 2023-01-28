export interface toggleButtonGroupPropsType {
  alignment: number;
  handleAlignment: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number
  ) => void;
  toggleValues: { value: number; label: string }[];
}
