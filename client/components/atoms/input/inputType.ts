export interface inputType {
  id: string;
  name?: string;
  label?: string;
  type?: string;
  endAdornment?: React.ReactNode;
  children?: React.ReactNode;
  select?: boolean;
  defaultValue?: string;
  selectProps?: {
    native: boolean;
  };
  rows?: number;
  multiline?: boolean;
  className?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}
